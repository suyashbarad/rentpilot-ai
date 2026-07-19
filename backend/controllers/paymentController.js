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
      if (err) {
  console.error("PAYMENT CREATE ERROR:", err);
  return res.status(500).json({
    success: false,
    error: err.message,
    code: err.code,
  });
}

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
      if (err) {
  console.error("PAYMENT CREATE ERROR:", err);
  return res.status(500).json({
    success: false,
    error: err.message,
    code: err.code,
  });
}

      res.json({
        message: "Payment updated successfully"
      });
    }
  );
};

exports.getAllPayments = (req, res) => {
  const sql = `
    SELECT
      rp.id,
      u.name,
      f.flat_number,
      rp.month,
      rp.year,
      rp.amount,
      rp.payment_status,
      rp.payment_date,
      rp.payment_mode,
      rp.transaction_id
    FROM rent_payments rp
    JOIN tenants t ON rp.tenant_id = t.id
    JOIN users u ON t.user_id = u.id
    JOIN flats f ON t.flat_id = f.id
    ORDER BY rp.id DESC
  `;

  pool.query(sql, [], (err, results) => {
    if (err) {
      console.error("PAYMENT GET ALL ERROR:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json(results);
  });
};

exports.getPaymentById = (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT
      rp.*,
      u.name,
      f.flat_number
    FROM rent_payments rp
    JOIN tenants t ON rp.tenant_id = t.id
    JOIN users u ON t.user_id = u.id
    JOIN flats f ON t.flat_id = f.id
    WHERE rp.id = ?
  `;

  pool.query(sql, [id], (err, results) => {
    if (err) {
      console.error("PAYMENT GET BY ID ERROR:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }
    res.json(results[0]);
  });
};

exports.deletePayment = (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM rent_payments WHERE id = ?`;

  pool.query(sql, [id], (err, result) => {
    if (err) {
      console.error("PAYMENT DELETE ERROR:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }
    res.json({ message: "Payment deleted successfully" });
  });
};
