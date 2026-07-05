const express = require("express");
const router = express.Router();

const buildingController = require("../controllers/buildingController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, buildingController.createBuilding);
router.get("/", authMiddleware, buildingController.getAllBuildings);        //adding one by function which is used in buildingController
router.get("/:id", authMiddleware, buildingController.getBuildingById);
router.put("/:id", authMiddleware, buildingController.updateBuilding);
router.delete("/:id", authMiddleware, buildingController.deleteBuilding);

module.exports = router;