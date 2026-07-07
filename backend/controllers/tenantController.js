const { pool } = require("../config/db");

exports.createTenant = (req, res) => {
  const {
    user_id,
    flat_id,
    aadhaar,
    occupation,
    family_members,
    joining_date,
    agreement_end
  } = req.body;

  if (
    !user_id ||
    !flat_id ||
    !aadhaar ||
    !occupation ||
    family_members == null ||
    !joining_date ||
    !agreement_end
  ) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  const sql = `
    INSERT INTO tenants
    (user_id, flat_id, aadhaar, occupation, family_members, joining_date, agreement_end)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  pool.query(
    sql,
    [
      user_id,
      flat_id,
      aadhaar,
      occupation,
      family_members,
      joining_date,
      agreement_end
    ],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Tenant created successfully"
      });
    }
  );
};
exports.getAllTenants = (req, res) => {
  const sql = `
    SELECT tenants.*, users.name, flats.flat_number
    FROM tenants
    JOIN users ON tenants.user_id = users.id
    JOIN flats ON tenants.flat_id = flats.id
    ORDER BY tenants.id DESC
  `;

  pool.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};
exports.getTenantById = (req, res) => {
  const { id } = req.params;

  pool.query(
    "SELECT * FROM tenants WHERE id = ?",
    [id],
    (err, results) => {
      if (err) return res.status(500).json(err);

      if (results.length === 0) {
        return res.status(404).json({
          message: "Tenant not found"
        });
      }

      res.json(results[0]);
    }
  );
};
exports.updateTenant = (req, res) => {
  const { id } = req.params;

  const {
    user_id,
    flat_id,
    aadhaar,
    occupation,
    family_members,
    joining_date,
    agreement_end
  } = req.body;

  const sql = `
    UPDATE tenants
    SET user_id=?, flat_id=?, aadhaar=?, occupation=?, family_members=?, joining_date=?, agreement_end=?
    WHERE id=?
  `;

  pool.query(
    sql,
    [
      user_id,
      flat_id,
      aadhaar,
      occupation,
      family_members,
      joining_date,
      agreement_end,
      id
    ],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Tenant updated successfully"
      });
    }
  );
};
exports.deleteTenant = (req, res) => {
  const { id } = req.params;

  pool.query(
    "DELETE FROM tenants WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).json(err);

      res.json({
        message: "Tenant deleted successfully"
      });
    }
  );
};