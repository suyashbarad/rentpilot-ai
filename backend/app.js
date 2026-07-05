const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");         
const buildingRoutes = require("./routes/buildingRoutes");          //for buildings management
const flatRoutes = require("./routes/flatRoutes");          //for flats management
const tenantRoutes = require("./routes/tenantRoutes");      //for tenants management - living people
const paymentRoutes = require("./routes/paymentRoutes");     //for payment status management
const complaintRoutes = require("./routes/complaintRoutes");    //for complaints management
const visitorRoutes = require("./routes/visitorRoutes");        //for visitors
const notificationRoutes = require("./routes/notificationRoutes");     //for notifiations
const dashboardRoutes = require("./routes/dashboardRoutes");        //final dashboard
const searchRoutes=require("./routes/searchRoutes");                //to find earch result
const aiRoutes = require("./routes/aiRoutes");                     //to use ai to find currect situation of system

app.use("/api/auth", authRoutes);
app.use("/api/buildings", buildingRoutes);
app.use("/api/flats", flatRoutes);
app.use("/api/tenants", tenantRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/visitors", visitorRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/search",searchRoutes);
app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
    res.send("🚀 RentPilot AI Backend is Running");
});
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

module.exports = app;