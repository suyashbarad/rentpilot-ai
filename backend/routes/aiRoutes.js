const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const aiController = require("../controllers/aiController");

/**
 * @swagger
 * /api/ai/insights:
 *   get:
 *     summary: Get AI Insights
 *     tags:
 *       - AI
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: AI generated insights
 */
router.get(
  "/insights",
  authMiddleware,
  aiController.getInsights
);

module.exports = router;