const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const buildingRoutes = require("./routes/buildingRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/buildings", buildingRoutes);

app.get("/", (req, res) => {
    res.send("🚀 RentPilot AI Backend is Running");
});

module.exports = app;