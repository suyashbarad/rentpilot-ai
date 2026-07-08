const express = require("express");
const router = express.Router();

const buildingController = require("../controllers/buildingController");
const authMiddleware = require("../middlewares/authMiddleware");
const { body } = require("express-validator");
const validate = require("../middlewares/validate");

/**
 * @swagger
 * /api/buildings:
 *   post:
 *     summary: Create building
 *     tags:
 *       - buildings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: building created successfully
 */

router.post(
  "/",
  authMiddleware,
  [
    body("building_name")
      .notEmpty()
      .withMessage("Building name is required"),

    body("address")
      .notEmpty()
      .withMessage("Address is required"),

    body("total_floors")
      .isInt({ min: 1 })
      .withMessage("Total floors must be at least 1"),

    body("total_flats")
      .isInt({ min: 1 })
      .withMessage("Total flats must be at least 1")
  ],
  validate,
  buildingController.createBuilding
);
/**
 * @swagger
 * /api/buildings:
 *   get:
 *     summary: Get All buildings
 *     tags:
 *       - buildings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of buildings
 */

router.get("/", authMiddleware, buildingController.getAllBuildings);        //adding one by function which is used in buildingController
router.get(
  "/search",
  authMiddleware,
  buildingController.searchBuildings
);
/**
 * @swagger
 * /api/buildings/{id}:
 *   get:
 *     summary: Get All buildings by its ID
 *     tags:
 *       - buildings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: building with given ID
 */

router.get("/:id", authMiddleware, buildingController.getBuildingById);

/**
 * @swagger
 * /api/buildings/{id}:
 *   put:
 *     summary: Update building details using ID
 *     tags:
 *       - buildings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: building updated
 */

router.put("/:id", authMiddleware, buildingController.updateBuilding);

/**
 * @swagger
 * /api/buildings/{id}:
 *   delete:
 *     summary: Delete building using ID
 *     tags:
 *       - buildings
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: building deleted
 */

router.delete("/:id", authMiddleware, buildingController.deleteBuilding);

module.exports = router;