const express = require("express");

const router = express.Router();

const notificationController = require("../controllers/notificationController");

const authMiddleware = require("../middlewares/authMiddleware");

router.post("/",authMiddleware,notificationController.createNotification);

router.get("/",authMiddleware,notificationController.getAllNotifications);

router.get("/:id",authMiddleware,notificationController.getNotificationById);

router.put("/:id",authMiddleware,notificationController.updateNotification);

router.delete("/:id",authMiddleware,notificationController.deleteNotification);

module.exports = router;