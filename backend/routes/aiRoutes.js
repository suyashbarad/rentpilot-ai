const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const aiController = require("../controllers/aiController");
const aiChatController = require("../controllers/aiChatController");

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

/**
 * @swagger
 * /api/ai/chat:
 *   post:
 *     summary: Chat with AI Assistant
 *     tags:
 *       - AI
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: AI chat response
 */
router.post(
  "/chat",
  authMiddleware,
  aiChatController.chat
);

module.exports = router;