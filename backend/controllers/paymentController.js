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

  if (!tenant_id || !month || !year || amount == null) {
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
