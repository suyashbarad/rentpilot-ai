const { GoogleGenerativeAI } = require("@google/generative-ai");
const { pool } = require("../config/db");

// Initialize Gemini (free tier - no credit card needed)
let genAI;
let model;
try {
    if (process.env.GEMINI_API_KEY) {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
    }
} catch (e) {
    console.warn("Could not initialize Gemini AI:", e.message);
}

// Helper: run a query and return results as a promise
function runQuery(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
}

// Gather all database context for the AI
async function gatherDatabaseContext() {
    try {
        const [
            buildings,
            flats,
            tenants,
            payments,
            complaints,
            visitors,
            stats
        ] = await Promise.all([
            runQuery("SELECT id, building_name, address FROM buildings LIMIT 50"),
            runQuery("SELECT id, flat_number, status, building_id FROM flats LIMIT 50"),
            runQuery(`SELECT t.id, u.name, u.email, u.phone, f.flat_number 
                      FROM tenants t 
                      JOIN users u ON t.user_id = u.id 
                      JOIN flats f ON t.flat_id = f.id LIMIT 50`),
            runQuery(`SELECT rp.id, u.name AS tenant_name, f.flat_number, rp.month, rp.year, rp.amount, rp.payment_status
                      FROM rent_payments rp
                      JOIN tenants t ON rp.tenant_id = t.id
                      JOIN users u ON t.user_id = u.id
                      JOIN flats f ON t.flat_id = f.id
                      ORDER BY rp.id DESC LIMIT 50`),
            runQuery("SELECT id, title, description, status FROM complaints ORDER BY id DESC LIMIT 50"),
            runQuery("SELECT id, visitor_name, visit_date, purpose FROM visitors ORDER BY id DESC LIMIT 50"),
            runQuery(`SELECT 
                        (SELECT COUNT(*) FROM buildings) AS totalBuildings,
                        (SELECT COUNT(*) FROM flats) AS totalFlats,
                        (SELECT COUNT(*) FROM flats WHERE status='Vacant') AS vacantFlats,
                        (SELECT COUNT(*) FROM flats WHERE status='Occupied') AS occupiedFlats,
                        (SELECT COUNT(*) FROM tenants) AS totalTenants,
                        (SELECT COUNT(*) FROM rent_payments WHERE payment_status='Pending') AS pendingPayments,
                        (SELECT COUNT(*) FROM rent_payments WHERE payment_status='Paid') AS paidPayments,
                        (SELECT COUNT(*) FROM rent_payments WHERE payment_status='Late') AS latePayments,
                        (SELECT COUNT(*) FROM complaints WHERE status='Open') AS openComplaints,
                        (SELECT COUNT(*) FROM visitors) AS totalVisitors
                    `)
        ]);

        return {
            summary: stats[0],
            buildings,
            flats,
            tenants,
            payments,
            complaints,
            visitors
        };
    } catch (err) {
        console.error("Error gathering DB context:", err);
        return { error: err.message };
    }
}

exports.chat = async (req, res) => {
    const { message, history } = req.body;

    if (!message || !message.trim()) {
        return res.status(400).json({ success: false, error: "Message is required" });
    }

    if (!model) {
        return res.status(500).json({ 
            success: false, 
            error: "Gemini API key is missing. Add GEMINI_API_KEY to your .env file. Get it free at https://aistudio.google.com/apikey" 
        });
    }

    try {
        // Gather live database context
        const dbContext = await gatherDatabaseContext();

        const systemPrompt = `You are RentPilot AI Assistant — an intelligent property management helper. You have access to the following LIVE database of the user's property management system.

DATABASE SUMMARY:
- Total Buildings: ${dbContext.summary?.totalBuildings || 0}
- Total Flats: ${dbContext.summary?.totalFlats || 0} (Occupied: ${dbContext.summary?.occupiedFlats || 0}, Vacant: ${dbContext.summary?.vacantFlats || 0})
- Total Tenants: ${dbContext.summary?.totalTenants || 0}
- Payments: Paid: ${dbContext.summary?.paidPayments || 0}, Pending: ${dbContext.summary?.pendingPayments || 0}, Late: ${dbContext.summary?.latePayments || 0}
- Open Complaints: ${dbContext.summary?.openComplaints || 0}
- Total Visitors: ${dbContext.summary?.totalVisitors || 0}

BUILDINGS DATA:
${JSON.stringify(dbContext.buildings || [], null, 2)}

FLATS DATA:
${JSON.stringify(dbContext.flats || [], null, 2)}

TENANTS DATA:
${JSON.stringify(dbContext.tenants || [], null, 2)}

RECENT PAYMENTS:
${JSON.stringify(dbContext.payments || [], null, 2)}

RECENT COMPLAINTS:
${JSON.stringify(dbContext.complaints || [], null, 2)}

RECENT VISITORS:
${JSON.stringify(dbContext.visitors || [], null, 2)}

INSTRUCTIONS:
- Answer questions about the property, tenants, payments, complaints, and visitors using the data above.
- Be helpful, concise, and professional.
- If asked about specific tenants, flats, or payments, look through the data and provide accurate answers.
- If asked for analysis or recommendations, provide actionable insights.
- Format responses nicely using bullet points and clear structure.
- If data is not available for a question, say so honestly.`;

        // Build conversation history for multi-turn chat
        const chatHistory = (history || []).map(msg => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }]
        }));

        const prompt = `
${systemPrompt}

Previous Conversation:
${(history || [])
  .map(h => `${h.role}: ${h.content}`)
  .join("\n")}

User:
${message}
`;

const result = await model.generateContent(prompt);
const response = result.response.text();
        res.json({ 
            success: true, 
            reply: response 
        });

    } catch (error) {
        console.error("AI CHAT ERROR:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};
