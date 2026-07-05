const db = require("../config/db");

exports.createComplaint = (req, res) => {
  const {
    tenant_id,
    title,
    description,
    priority,
    status
  } = req.body;

  if (
    !tenant_id ||
    !title ||
    !description
  ) {
    return res.status(400).json({
      message: "Required fields are missing"
    });
  }

  const sql = `
    INSERT INTO complaints
    (
      tenant_id,
      title,
      description,
      priority,
      status
    )
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [
      tenant_id,
      title,
      description,
      priority || "Medium",
      status || "Open"
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.status(201).json({
        message: "Complaint created successfully"
      });
    }
  );
};
exports.getAllComplaints = (req, res) => {
  const sql = `
    SELECT
      complaints.*,
      users.name,
      flats.flat_number
    FROM complaints
    JOIN tenants ON complaints.tenant_id = tenants.id
    JOIN users ON tenants.user_id = users.id
    JOIN flats ON tenants.flat_id = flats.id
    ORDER BY complaints.id DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};
exports.getComplaintById = (req, res) => {
  const { id } = req.params;

  db.query(
    "SELECT * FROM complaints WHERE id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length === 0) {
        return res.status(404).json({
          message: "Complaint not found"
        });
      }

      res.json(results[0]);
    }
  );
};
exports.updateComplaint = (req, res) => {
  const { id } = req.params;

  const {
    tenant_id,
    title,
    description,
    priority,
    status
  } = req.body;

  const sql = `
    UPDATE complaints
    SET tenant_id=?, title=?, description=?, priority=?, status=?
    WHERE id=?
  `;

  db.query(
    sql,
    [
      tenant_id,
      title,
      description,
      priority,
      status,
      id
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Complaint updated successfully"
      });
    }
  );
};
exports.deleteComplaint = (req, res) => {
  const { id } = req.params;

  db.query(
    "DELETE FROM complaints WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Complaint deleted successfully"
      });
    }
  );
};