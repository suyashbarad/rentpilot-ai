const db = require("../config/db");

exports.getInsights = (req, res) => {

    const queries = [

        "SELECT COUNT(*) AS pendingPayments FROM rent_payments WHERE payment_status='Pending'",

        "SELECT COUNT(*) AS openComplaints FROM complaints WHERE status='Open'",

        "SELECT COUNT(*) AS vacantFlats FROM flats WHERE status='Vacant'",

        "SELECT COUNT(*) AS totalFlats FROM flats"

    ];

    Promise.all(

        queries.map(query =>
            new Promise((resolve, reject) => {

                db.query(query, (err, result) => {

                    if (err) reject(err);
                    else resolve(result[0]);

                });

            })
        )

    )

    .then(results => {

        const pendingPayments = results[0].pendingPayments;

        const openComplaints = results[1].openComplaints;

        const vacantFlats = results[2].vacantFlats;

        const totalFlats = results[3].totalFlats;

        const insights = [];

        if (pendingPayments > 0) {

            insights.push({
                type: "Rent",
                message: `${pendingPayments} rent payment(s) are pending.`,
                recommendation: "Send payment reminders."
            });

        }

        if (openComplaints > 0) {

            insights.push({
                type: "Complaint",
                message: `${openComplaints} complaint(s) are still open.`,
                recommendation: "Resolve complaints quickly."
            });

        }

        if (vacantFlats > 0) {

            insights.push({
                type: "Occupancy",
                message: `${vacantFlats} flat(s) are vacant.`,
                recommendation: "Advertise available flats."
            });

        }

        if (totalFlats > 0 && vacantFlats / totalFlats > 0.30) {

            insights.push({
                type: "Business",
                message: "Occupancy rate is below 70%.",
                recommendation: "Run marketing campaigns to attract tenants."
            });

        }

        if (insights.length === 0) {

            insights.push({
                type: "Success",
                message: "Everything looks good.",
                recommendation: "Keep monitoring the system."
            });

        }

        res.json(insights);

    })

    .catch(err => {

        res.status(500).json(err);

    });

};