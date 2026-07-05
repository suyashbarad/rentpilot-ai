const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const dashboardController = require("../controllers/dashboardController");

/**
 * @swagger
 * /api/dashboard:
 *   get:
 *     summary: Get Dashboard Statistics
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics
 */
router.get("/", authMiddleware, dashboardController.getDashboardStats);

/**
 * @swagger
 * /api/dashboard/analytics:
 *   get:
 *     summary: Get Dashboard Analytics
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard analytics
 */
router.get(
  "/analytics",
  authMiddleware,
  dashboardController.getDashboardAnalytics
);

module.exports = router;