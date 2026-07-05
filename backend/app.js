const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");         
const buildingRoutes = require("./routes/buildingRoutes");          //for buildings management
const flatRoutes = require("./routes/flatRoutes");          //for flats management
const tenantRoutes = require("./routes/tenantRoutes");      //for tenants management - living people
const paymentRoutes = require("./routes/paymentRoutes");     //for payment status management

app.use("/api/auth", authRoutes);
app.use("/api/buildings", buildingRoutes);
app.use("/api/flats", flatRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/payments", paymentRoutes);

app.get("/", (req, res) => {
    res.send("🚀 RentPilot AI Backend is Running");
});

module.exports = app;