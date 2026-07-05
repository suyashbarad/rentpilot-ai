const express = require("express");
const router = express.Router();

const visitorController = require("../controllers/visitorController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, visitorController.createVisitor);
router.get("/", authMiddleware, visitorController.getAllVisitors);
router.get("/:id", authMiddleware, visitorController.getVisitorById);
router.put("/:id", authMiddleware, visitorController.updateVisitor);
router.delete("/:id", authMiddleware, visitorController.deleteVisitor);

module.exports = router;