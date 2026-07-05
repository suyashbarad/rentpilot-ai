const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const searchController = require("../controllers/searchController");

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Global Search
 *     tags:
 *       - Search
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *         description: Search keyword
 *     responses:
 *       200:
 *         description: Search results
 */
router.get("/", authMiddleware, searchController.globalSearch);

module.exports = router;