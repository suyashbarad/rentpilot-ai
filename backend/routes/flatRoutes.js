const express = require("express");
const router = express.Router();

const flatController = require("../controllers/flatController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/flats:
 *   post:
 *     summary: Create flat
 *     tags:
 *       - flats
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: flat created successfully
 */

router.post("/", authMiddleware, flatController.createFlat);

/**
 * @swagger
 * /api/flats:
 *   get:
 *     summary: Get All flats
 *     tags:
 *       - flats
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of flats
 */

router.get("/", authMiddleware, flatController.getAllFlats);        //adding one by function which is used in flatController

/**
 * @swagger
 * /api/flats/{id}:
 *   get:
 *     summary: Get All flats by its ID
 *     tags:
 *       - flats
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: flat with given ID
 */

router.get("/:id", authMiddleware, flatController.getFlatById);

/**
 * @swagger
 * /api/flats/{id}:
 *   put:
 *     summary: Update flat details using ID
 *     tags:
 *       - flats
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: flat updated
 */

router.put("/:id", authMiddleware, flatController.updateFlat);

/**
 * @swagger
 * /api/flats/{id}:
 *   delete:
 *     summary: Delete flat using ID
 *     tags:
 *       - flats
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: flat deleted
 */

router.delete("/:id", authMiddleware, flatController.deleteFlat);

module.exports = router;