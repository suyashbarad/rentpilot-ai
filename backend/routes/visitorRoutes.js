const express = require("express");
const router = express.Router();

const visitorController = require("../controllers/visitorController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/visitors:
 *   post:
 *     summary: Create visitor
 *     tags:
 *       - visitors
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: visitor created successfully
 */

router.post("/", authMiddleware, visitorController.createVisitor);

/**
 * @swagger
 * /api/visitors:
 *   get:
 *     summary: Get All visitors
 *     tags:
 *       - visitors
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of visitors
 */

router.get("/", authMiddleware, visitorController.getAllVisitors);        //adding one by function which is used in visitorController

/**
 * @swagger
 * /api/visitors/{id}:
 *   get:
 *     summary: Get All visitors by its ID
 *     tags:
 *       - visitors
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: visitor with given ID
 */

router.get("/:id", authMiddleware, visitorController.getVisitorById);

/**
 * @swagger
 * /api/visitors/{id}:
 *   put:
 *     summary: Update visitor details using ID
 *     tags:
 *       - visitors
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: visitor updated
 */

router.put("/:id", authMiddleware, visitorController.updateVisitor);

/**
 * @swagger
 * /api/visitors/{id}:
 *   delete:
 *     summary: Delete visitor using ID
 *     tags:
 *       - visitors
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: visitor deleted
 */

router.delete("/:id", authMiddleware, visitorController.deleteVisitor);

module.exports = router;