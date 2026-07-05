const express = require("express");
const router = express.Router();

const tenantController = require("../controllers/tenantController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", authMiddleware, tenantController.createTenant);
router.get("/", authMiddleware, tenantController.getAllTenants);
router.get("/:id", authMiddleware, tenantController.getTenantById);
router.put("/:id", authMiddleware, tenantController.updateTenant);
router.delete("/:id", authMiddleware, tenantController.deleteTenant);

module.exports = router;