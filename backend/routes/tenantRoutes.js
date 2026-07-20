const express = require("express");
const router = express.Router();
console.log("TENANT ROUTES LOADED");

const tenantController = require("../controllers/tenantController");
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /api/tenants:
 *   post:
 *     summary: Create tenant
 *     tags:
 *       - tenants
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: tenant created successfully
 */

router.post("/", authMiddleware, tenantController.createTenant);

/**
 * @swagger
 * /api/tenants:
 *   get:
 *     summary: Get All tenants
 *     tags:
 *       - tenants
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tenants
 */

router.get("/", authMiddleware, tenantController.getAllTenants);        //adding one by function which is used in tenantController

router.get("/options", authMiddleware, tenantController.getTenantOptions);

/**
 * @swagger
 * /api/tenants/{id}:
 *   get:
 *     summary: Get All tenants by its ID
 *     tags:
 *       - tenants
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: tenant with given ID
 */

router.get("/:id", authMiddleware, tenantController.getTenantById);

/**
 * @swagger
 * /api/tenants/{id}:
 *   put:
 *     summary: Update tenant details using ID
 *     tags:
 *       - tenants
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: tenant updated
 */

router.put("/:id", authMiddleware, tenantController.updateTenant);

/**
 * @swagger
 * /api/tenants/{id}:
 *   delete:
 *     summary: Delete tenant using ID
 *     tags:
 *       - tenants
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: tenant deleted
 */

router.delete("/:id", authMiddleware, tenantController.deleteTenant);

module.exports = router;
