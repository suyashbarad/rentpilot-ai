const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login Admin
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/profile", authMiddleware, (req, res) => {
  res.json({

    message: "Protected route accessed successfully",

    admin: req.admin

  });

});
module.exports = router;