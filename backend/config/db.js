const mysql = require("mysql2");
const logger = require("../utils/logger");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl:
    process.env.DB_SSL === "true"
      ? { rejectUnauthorized: false }
      : undefined,
});

function connectDB() {
  pool.getConnection((err, connection) => {
    if (err) {
      logger.error(err.message);
      return;
    }

    logger.info("✅ MySQL Pool Connected");

    connection.query("SELECT DATABASE() AS db", (err, result) => {
      if (!err) console.log("Connected Database:", result);
      connection.release();
    });
  });
}

module.exports = {
  pool,
  connectDB,
};