const express = require("express");
const router = express.Router();

const communicationController = require("../controllers/communicationController");
const authMiddleware = require("../middlewares/authMiddleware");

// Twilio webhook doesn't need auth, as Twilio calls it directly
router.get("/twiml", communicationController.generateTwiML);
router.post("/twiml", communicationController.generateTwiML);

// Protected routes triggered by the frontend
router.post("/sms", authMiddleware, communicationController.sendSMS);
router.post("/call", authMiddleware, communicationController.initiateCall);

module.exports = router;
