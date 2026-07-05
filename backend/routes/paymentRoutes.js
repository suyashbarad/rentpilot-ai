const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/payments:
 *   post:
 *     summary: Create payment
 *     tags:
 *       - payments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: payment created successfully
 */

router.post("/", authMiddleware, paymentController.createPayment);

/**
 * @swagger
 * /api/payments:
 *   get:
 *     summary: Get All payments
 *     tags:
 *       - payments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of payments
 */

router.get("/", authMiddleware, paymentController.getAllPayments);        //adding one by function which is used in paymentController

/**
 * @swagger
 * /api/payments/{id}:
 *   get:
 *     summary: Get All payments by its ID
 *     tags:
 *       - payments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: payment with given ID
 */

router.get("/:id", authMiddleware, paymentController.getPaymentById);

/**
 * @swagger
 * /api/payments/{id}:
 *   put:
 *     summary: Update payment details using ID
 *     tags:
 *       - payments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: payment updated
 */

router.put("/:id", authMiddleware, paymentController.updatePayment);

/**
 * @swagger
 * /api/payments/{id}:
 *   delete:
 *     summary: Delete payment using ID
 *     tags:
 *       - payments
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: payment deleted
 */

router.delete("/:id", authMiddleware, paymentController.deletePayment);

module.exports = router;