const { pool } = require("../config/db");

exports.createPayment = (req, res) => {
  const {
    tenant_id,
    month,
    year,
    amount,
    payment_status,
    payment_date,
    payment_mode,
    transaction_id
  } = req.body;

  if (
    !tenant_id ||
    !month ||
    !year ||
    amount == null
  ) {
    return res.status(400).json({
      message: "Required fields are missing"
    });
  }

  const sql = `
    INSERT INTO rent_payments
    (
      tenant_id,
      month,
      year,
      amount,
      payment_status,
      payment_date,
      payment_mode,
      transaction_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  pool.query(
    sql,
    [
      tenant_id,
      month,
      year,
      amount,
      payment_status || "Pending",
      payment_date,
      payment_mode,
      transaction_id
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        message: "Payment added successfully"
      });
    }
  );
};
exports.getAllPayments = (req, res) => {
  const sql = `
    SELECT
      rent_payments.*,
      users.name,
      flats.flat_number
    FROM rent_payments
    JOIN tenants ON rent_payments.tenant_id = tenants.id
    JOIN users ON tenants.user_id = users.id
    JOIN flats ON tenants.flat_id = flats.id
    ORDER BY rent_payments.id DESC
  `;

  pool.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};
exports.getPaymentById = (req, res) => {
  const { id } = req.params;

  pool.query(
    "SELECT * FROM rent_payments WHERE id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length === 0) {
        return res.status(404).json({
          message: "Payment not found"
        });
      }

      res.json(results[0]);
    }
  );
};
exports.updatePayment = (req, res) => {
  const { id } = req.params;

  const {
    tenant_id,
    month,
    year,
    amount,
    payment_status,
    payment_date,
    payment_mode,
    transaction_id
  } = req.body;

  const sql = `
    UPDATE rent_payments
    SET tenant_id=?, month=?, year=?, amount=?, payment_status=?, payment_date=?, payment_mode=?, transaction_id=?
    WHERE id=?
  `;

  pool.query(
    sql,
    [
      tenant_id,
      month,
      year,
      amount,
      payment_status,
      payment_date,
      payment_mode,
      transaction_id,
      id
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Payment updated successfully"
      });
    }
  );
};
exports.deletePayment = (req, res) => {
  const { id } = req.params;

  pool.query(
    "DELETE FROM rent_payments WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Payment deleted successfully"
      });
    }
  );
};