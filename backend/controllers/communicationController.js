const twilio = require('twilio');
const { OpenAI } = require('openai');

// Initialize SDKs (these will use environment variables in production)
let twilioClient;
let openai;
try {
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
        twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
    }
    if (process.env.OPENAI_API_KEY) {
        openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    }
} catch (e) {
    console.warn("Could not initialize communication SDKs, missing keys.");
}

exports.sendSMS = async (req, res) => {
    const { tenant_id, phone, messageContext } = req.body;

    if (!phone || !messageContext) {
        return res.status(400).json({ success: false, message: "Phone number and message context are required" });
    }

    if (!openai || !twilioClient) {
        console.warn("Simulating SMS because API keys are missing.");
        return res.json({ 
            success: true, 
            message: "AI SMS Sent Successfully (Simulated Mode - No Twilio/OpenAI Keys)", 
            smsText: `[Simulated AI] Hello! This is a reminder regarding: ${messageContext}` 
        });
    }

    try {
        // Use OpenAI to generate a tailored SMS
        const aiResponse = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: `Write a polite SMS reminder for a tenant regarding: ${messageContext}. Keep it short and under 160 characters.` }]
        });
        const smsText = aiResponse.choices[0].message.content;

        // Then send via Twilio
        await twilioClient.messages.create({
            body: smsText,
            from: process.env.TWILIO_PHONE_NUMBER,
            to: phone
        });

        res.json({ success: true, message: "AI SMS Sent Successfully", smsText });

    } catch (error) {
        console.error("SMS ERROR:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.initiateCall = async (req, res) => {
    const { tenant_id, phone, callContext } = req.body;

    if (!phone || !callContext) {
        return res.status(400).json({ success: false, message: "Phone number and call context are required" });
    }

    if (!twilioClient) {
        console.warn("Simulating Call because Twilio keys are missing.");
        return res.json({ 
            success: true, 
            message: "AI Voice Call Initiated Successfully (Simulated Mode - No Twilio Keys)", 
            callContext 
        });
    }

    try {
        // Trigger a Twilio Voice call pointing to a TwiML webhook
        // Note: Replace the URL with your actual public ngrok or production URL when available
        // For testing locally without a public URL, this might fail unless you use ngrok
        const webhookUrl = process.env.TWILIO_WEBHOOK_URL || `https://your-domain.com/api/communication/twiml`;
        
        await twilioClient.calls.create({
            url: `${webhookUrl}?context=${encodeURIComponent(callContext)}`,
            to: phone,
            from: process.env.TWILIO_PHONE_NUMBER
        });

        res.json({ success: true, message: "AI Call Initiated Successfully", callContext });

    } catch (error) {
        console.error("CALL ERROR:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.generateTwiML = (req, res) => {
    // This is the webhook Twilio hits when the call connects
    const context = req.query.context || "a general reminder";
    const VoiceResponse = twilio.twiml.VoiceResponse;
    const twiml = new VoiceResponse();

    // Use a basic Say verb for now. In advanced implementations, this hooks into OpenAI Realtime API.
    twiml.say(
        { voice: 'Polly.Matthew-Neural' }, 
        `Hello, this is the RentPilot AI assistant calling regarding ${context}. Please contact the administration office for more details.`
    );

    res.type('text/xml');
    res.send(twiml.toString());
};
