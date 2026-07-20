const { pool } = require("../config/db");
const bcrypt = require("bcrypt");

// ========================= CREATE =========================

exports.createTenant = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      flat_id,
      aadhaar,
      occupation,
      family_members,
      joining_date,
      agreement_end,
    } = req.body;

    // Check email exists
    pool.query(
      "SELECT id FROM users WHERE email=?",
      [email],
      async (err, rows) => {
        if (err) {
    console.error("MYSQL ERROR:", err);
    return res.status(500).json({
        success: false,
        error: err.message,
        code: err.code
    });
}

        if (rows.length > 0) {
          return res.status(400).json({
            message: "Email already exists",
          });
        }

        const hashed = await bcrypt.hash(password, 10);
        console.log("INSERT VALUES:", [
            name,
            email,
            hashed,
            phone,
            "Tenant",
            flat_id,
            aadhaar,
            occupation,
            family_members,
            joining_date,
            agreement_end
        ]);
        const sql = `
        INSERT INTO users
        (
          name,
          email,
          password,
          phone,
          role,
          flat_id,
          aadhaar,
          occupation,
          family_members,
          joining_date,
          agreement_end
        )
        VALUES (?,?,?,?,?,?,?,?,?,?,?)
        `;

        pool.query(
          sql,
          [
            name,
            email,
            hashed,
            phone,
            "Tenant",
            flat_id,
            aadhaar,
            occupation,
            family_members,
            joining_date,
            agreement_end,
          ],
          (err, result) => {
            if (err) {
    console.error("MYSQL ERROR:", err);
    return res.status(500).json({
        success: false,
        error: err.message,
        code: err.code
    });
}

            const tenantSql = `
              INSERT INTO tenants
                (user_id, flat_id, aadhaar, occupation, family_members, joining_date, agreement_end)
              VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

            pool.query(
              tenantSql,
              [
                result.insertId,
                flat_id,
                aadhaar,
                occupation,
                family_members,
                joining_date,
                agreement_end,
              ],
              (tenantErr) => {
                if (tenantErr) {
                  console.error("TENANT CREATE ERROR:", tenantErr);
                  return res.status(500).json({
                    success: false,
                    error: tenantErr.message,
                    code: tenantErr.code,
                  });
                }

                res.status(201).json({
                  success: true,
                  message: "Tenant Added Successfully",
                });
              }
            );
          }
        );
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

// ========================= GET ALL =========================

exports.getAllTenants = (req, res) => {
  const sql = `
    SELECT
      users.*,
      tenants.id AS tenant_id,
      flats.flat_number
    FROM users
    LEFT JOIN tenants
      ON tenants.user_id = users.id
    LEFT JOIN flats
      ON users.flat_id = flats.id
    WHERE users.role='Tenant'
    ORDER BY users.id DESC
  `;

  pool.query(sql, (err, result) => {
    if (err) {
    console.error("MYSQL ERROR:", err);
    return res.status(500).json({
        success: false,
        error: err.message,
        code: err.code
    });
}

    res.json(result);
  });
};

// Tenant records are referenced by payments, complaints, visitors, and notifications.
// Keep this endpoint separate from the management list, whose `id` is a users.id.
exports.getTenantOptions = (req, res) => {
  const sql = `
    SELECT
      tenants.id,
      users.name,
      users.email,
      flats.flat_number
    FROM tenants
    JOIN users ON users.id = tenants.user_id
    LEFT JOIN flats ON flats.id = tenants.flat_id
    WHERE users.role = 'Tenant'
    ORDER BY users.name ASC
  `;

  pool.query(sql, (err, result) => {
    if (err) {
      console.error("TENANT OPTIONS ERROR:", err);
      return res.status(500).json({
        success: false,
        error: err.message,
        code: err.code,
      });
    }

    res.json(result);
  });
};

// ========================= GET ONE =========================

exports.getTenantById = (req, res) => {
  const { id } = req.params;

  pool.query(
    "SELECT * FROM users WHERE id=? AND role='Tenant'",
    [id],
    (err, result) => {
      if (err) {
    console.error("MYSQL ERROR:", err);
    return res.status(500).json({
        success: false,
        error: err.message,
        code: err.code
    });
}
      if (result.length === 0) {
        return res.status(404).json({
          message: "Tenant not found",
        });
      }

      res.json(result[0]);
    }
  );
};

// ========================= UPDATE =========================

exports.updateTenant = (req, res) => {
  const { id } = req.params;

  const {
    name,
    email,
    phone,
    flat_id,
    aadhaar,
    occupation,
    family_members,
    joining_date,
    agreement_end,
  } = req.body;

  const sql = `
    UPDATE users
    SET
      name=?,
      email=?,
      phone=?,
      flat_id=?,
      aadhaar=?,
      occupation=?,
      family_members=?,
      joining_date=?,
      agreement_end=?
    WHERE id=? AND role='Tenant'
  `;

  pool.query(
    sql,
    [
      name,
      email,
      phone,
      flat_id,
      aadhaar,
      occupation,
      family_members,
      joining_date,
      agreement_end,
      id,
    ],
    (err) => {
      if (err) {
    console.error("MYSQL ERROR:", err);
    return res.status(500).json({
        success: false,
        error: err.message,
        code: err.code
    });
}

      res.json({
        success: true,
        message: "Tenant updated successfully",
      });
    }
  );
};

// ========================= DELETE =========================

exports.deleteTenant = (req, res) => {
  const { id } = req.params;

  pool.query(
    "DELETE FROM users WHERE id=? AND role='Tenant'",
    [id],
    (err, result) => {
      if (err) {
        console.error("MYSQL ERROR:", err);
        return res.status(500).json({
            success: false,
            error: err.message,
            code: err.code
      });
}

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Tenant not found",
        });
      }

      res.json({
        success: true,
        message: "Tenant deleted successfully",
      });
    }
  );
};
