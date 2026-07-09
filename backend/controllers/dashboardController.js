const { pool } = require("../config/db");

exports.getDashboardStats = async (req, res) => {
  try {

    const queries = [
      "SELECT COUNT(*) AS totalBuildings FROM buildings",
      "SELECT COUNT(*) AS totalFlats FROM flats",
      "SELECT COUNT(*) AS occupiedFlats FROM flats WHERE status='Occupied'",
      "SELECT COUNT(*) AS vacantFlats FROM flats WHERE status='Vacant'",
      "SELECT COUNT(*) AS totalTenants FROM tenants",
      "SELECT COUNT(*) AS pendingPayments FROM rent_payments WHERE payment_status='Pending'",
      "SELECT COUNT(*) AS openComplaints FROM complaints WHERE status='Open'",
      "SELECT COUNT(*) AS visitorsToday FROM visitors WHERE DATE(entry_time)=CURDATE()"
    ];

    Promise.all(
      queries.map(
        query =>
          new Promise((resolve, reject) => {
            pool.query(query, (err, result) => {
              if (err) reject(err);
              else resolve(result[0]);
            });
          })
      )
    )
    .then(results => {

      res.json({
        ...results[0],
        ...results[1],
        ...results[2],
        ...results[3],
        ...results[4],
        ...results[5],
        ...results[6],
        ...results[7]
      });

    })
    .catch(err => {

      res.status(500).json(err);

    });

  } catch (err) {

    res.status(500).json(err);

  }
};
exports.getDashboardAnalytics = (req, res) => {

  const queries = [

    "SELECT IFNULL(SUM(amount),0) AS totalRentCollected FROM rent_payments WHERE payment_status='Paid'",

    "SELECT IFNULL(SUM(amount),0) AS pendingRent FROM rent_payments WHERE payment_status='Pending'",

    `
    SELECT
    ROUND(
      (
        SELECT COUNT(*)
        FROM flats
        WHERE status='Occupied'
      ) * 100 /
      NULLIF(
        (SELECT COUNT(*) FROM flats),
        0
      ),
      2
    ) AS occupancyRate
    `
  ];

  Promise.all(

    queries.map(query =>
      new Promise((resolve, reject) => {

        pool.query(query, (err, result) => {

          if (err) reject(err);
          else resolve(result[0]);

        });

      })
    )

  )

  .then(results => {

    res.json({

      ...results[0],
      ...results[1],
      ...results[2]

    });

  })

  .catch(err => {

    res.status(500).json(err);

  });

};
exports.getRecentActivity = (req, res) => {

  const recentPayments = `
    SELECT
      users.name,
      rent_payments.amount,
      rent_payments.payment_status,
      rent_payments.payment_date
    FROM rent_payments
    JOIN tenants
      ON rent_payments.tenant_id = tenants.id
    JOIN users
      ON tenants.user_id = users.id
    ORDER BY rent_payments.id DESC
    LIMIT 5
  `;

  const recentComplaints = `
    SELECT
      users.name,
      complaints.title,
      complaints.status
    FROM complaints
    JOIN tenants
      ON complaints.tenant_id = tenants.id
    JOIN users
      ON tenants.user_id = users.id
    ORDER BY complaints.id DESC
    LIMIT 5
  `;

  Promise.all([

    new Promise((resolve, reject) => {

      pool.query(recentPayments, (err, result) => {

        if (err) reject(err);
        else resolve(result);

      });

    }),

    new Promise((resolve, reject) => {

      pool.query(recentComplaints, (err, result) => {

        if (err) reject(err);
        else resolve(result);

      });

    })

  ])

  .then(results => {

    res.json({

      payments: results[0],
      complaints: results[1]

    });

  })

  .catch(err => {

    res.status(500).json(err);

  });

};