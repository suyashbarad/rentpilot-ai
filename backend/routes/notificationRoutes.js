const express = require("express");
const router = express.Router();

const notificationController = require("../controllers/notificationController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Create notification
 *     tags:
 *       - notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: notification created successfully
 */

router.post("/", authMiddleware, notificationController.createNotification);

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Get All notifications
 *     tags:
 *       - notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 */

router.get("/", authMiddleware, notificationController.getAllNotifications);        //adding one by function which is used in notificationController

/**
 * @swagger
 * /api/notifications/{id}:
 *   get:
 *     summary: Get All notifications by its ID
 *     tags:
 *       - notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: notification with given ID
 */

router.get("/:id", authMiddleware, notificationController.getNotificationById);

/**
 * @swagger
 * /api/notifications/{id}:
 *   put:
 *     summary: Update notification details using ID
 *     tags:
 *       - notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: notification updated
 */

router.put("/:id", authMiddleware, notificationController.updateNotification);

/**
 * @swagger
 * /api/notifications/{id}:
 *   delete:
 *     summary: Delete notification using ID
 *     tags:
 *       - notifications
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: notification deleted
 */

router.delete("/:id", authMiddleware, notificationController.deleteNotification);

module.exports = router;