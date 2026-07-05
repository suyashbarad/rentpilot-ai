const express = require("express");
const router = express.Router();

const flatController = require("../controllers/flatController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, flatController.createFlat);        //create a flat entry
router.get("/", authMiddleware, flatController.getAllFlats);        //get all flats details
router.get("/:id", authMiddleware, flatController.getFlatById);     //get flat details by id
router.put("/:id", authMiddleware, flatController.updateFlat);     //update flat details (by id)
router.delete("/:id", authMiddleware, flatController.deleteFlat);     //delete flat details (by id)


module.exports = router;