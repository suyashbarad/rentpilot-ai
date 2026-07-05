const express = require("express");
const router = express.Router();

const complaintController = require("../controllers/complaintController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, complaintController.createComplaint);
router.get("/", authMiddleware, complaintController.getAllComplaints);
router.get("/:id", authMiddleware, complaintController.getComplaintById);
router.put("/:id", authMiddleware, complaintController.updateComplaint);
router.delete("/:id", authMiddleware, complaintController.deleteComplaint);

module.exports = router;