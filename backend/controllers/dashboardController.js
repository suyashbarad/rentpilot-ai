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