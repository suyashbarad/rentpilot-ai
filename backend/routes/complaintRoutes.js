const express = require("express");
const router = express.Router();

const complaintController = require("../controllers/complaintController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/complaints:
 *   post:
 *     summary: Create complaint
 *     tags:
 *       - complaints
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: complaint created successfully
 */

router.post("/", authMiddleware, complaintController.createComplaint);

/**
 * @swagger
 * /api/complaints:
 *   get:
 *     summary: Get All complaints
 *     tags:
 *       - complaints
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of complaints
 */

router.get("/", authMiddleware, complaintController.getAllComplaints);        //adding one by function which is used in complaintController

/**
 * @swagger
 * /api/complaints/{id}:
 *   get:
 *     summary: Get All complaints by its ID
 *     tags:
 *       - complaints
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: complaint with given ID
 */

router.get("/:id", authMiddleware, complaintController.getComplaintById);

/**
 * @swagger
 * /api/complaints/{id}:
 *   put:
 *     summary: Update complaint details using ID
 *     tags:
 *       - complaints
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: complaint updated
 */

router.put("/:id", authMiddleware, complaintController.updateComplaint);

/**
 * @swagger
 * /api/complaints/{id}:
 *   delete:
 *     summary: Delete complaint using ID
 *     tags:
 *       - complaints
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: complaint deleted
 */

router.delete("/:id", authMiddleware, complaintController.deleteComplaint);

module.exports = router;