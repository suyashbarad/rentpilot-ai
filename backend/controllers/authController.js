const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("../config/db");

// Register Admin
exports.register = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO admins (full_name, email, password)
      VALUES (?, ?, ?)
    `;

    pool.query(sql, [full_name, email, hashedPassword], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Admin registered successfully"
      });
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

// Login Admin
exports.login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required"
    });
  }

  const sql = "SELECT * FROM admins WHERE email = ?";

  pool.query(sql, [email], async (err, results) => {
  if (err) {
    console.error("Login database error:", err);
    return res.status(500).json({
      message: "Database connection failed. Please try again later.",
    });
  }

  if (results.length === 0) {
    return res.status(401).json({
      message: "Invalid email or password",
    });
  }

  try {
    const admin = results[0];
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.json({
      message: "Login successful",
      token,
      admin: {
        full_name: admin.full_name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Login processing error:", error);
    return res.status(500).json({
      message: "Login failed due to a server error.",
    });
  }
});

};