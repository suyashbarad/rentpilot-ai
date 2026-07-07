const { pool } = require("../config/db");

exports.createVisitor = (req, res) => {
  const {
    tenant_id,
    visitor_name,
    phone,
    vehicle_number,
    entry_time,
    exit_time
  } = req.body;

  if (
    !tenant_id ||
    !visitor_name ||
    !phone ||
    !entry_time
  ) {
    return res.status(400).json({
      message: "Required fields are missing"
    });
  }

  const sql = `
    INSERT INTO visitors
    (
      tenant_id,
      visitor_name,
      phone,
      vehicle_number,
      entry_time,
      exit_time
    )
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  pool.query(
    sql,
    [
      tenant_id,
      visitor_name,
      phone,
      vehicle_number,
      entry_time,
      exit_time
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        message: "Visitor added successfully"
      });
    }
  );
};
exports.getAllVisitors = (req, res) => {
  const sql = `
    SELECT
      visitors.*,
      users.name,
      flats.flat_number
    FROM visitors
    JOIN tenants ON visitors.tenant_id = tenants.id
    JOIN users ON tenants.user_id = users.id
    JOIN flats ON tenants.flat_id = flats.id
    ORDER BY visitors.id DESC
  `;

  pool.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);

    res.json(results);
  });
};
exports.getVisitorById = (req, res) => {
  const { id } = req.params;

  pool.query(
    "SELECT * FROM visitors WHERE id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length === 0) {
        return res.status(404).json({
          message: "Visitor not found"
        });
      }

      res.json(results[0]);
    }
  );
};
exports.updateVisitor = (req, res) => {
  const { id } = req.params;

  const {
    tenant_id,
    visitor_name,
    phone,
    vehicle_number,
    entry_time,
    exit_time
  } = req.body;

  const sql = `
    UPDATE visitors
    SET
      tenant_id=?,
      visitor_name=?,
      phone=?,
      vehicle_number=?,
      entry_time=?,
      exit_time=?
    WHERE id=?
  `;

  pool.query(
    sql,
    [
      tenant_id,
      visitor_name,
      phone,
      vehicle_number,
      entry_time,
      exit_time,
      id
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Visitor updated successfully"
      });
    }
  );
};
exports.deleteVisitor = (req, res) => {
  const { id } = req.params;

  pool.query(
    "DELETE FROM visitors WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Visitor deleted successfully"
      });
    }
  );
};