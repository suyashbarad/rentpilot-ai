const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, paymentController.createPayment);
router.get("/", authMiddleware, paymentController.getAllPayments);
router.get("/:id", authMiddleware, paymentController.getPaymentById);
router.put("/:id", authMiddleware, paymentController.updatePayment);
router.delete("/:id", authMiddleware, paymentController.deletePayment);

module.exports = router;