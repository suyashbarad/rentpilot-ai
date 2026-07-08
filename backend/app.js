const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const morgan = require("morgan");
const logger = require("./utils/logger");       //for deployment
const helmet = require("helmet");       //for security purpose
const rateLimit = require("express-rate-limit");
const compression = require("compression");

const app = express();


app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(helmet());
app.use(
  express.json({
    limit: "10kb",
  })
);
app.use(compression());

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


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests. Please try again later."
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "UP",
    service: "RentPilot AI",
    timestamp: new Date().toISOString(),
  });
});

const { pool } = require("./config/db");

app.get("/ready", (req, res) => {
  pool.query("SELECT 1", (err) => {
    if (err) {
      return res.status(503).json({
        status: "NOT READY",
      });
    }

    res.json({
      status: "READY",
    });
  });
});

app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  })
);
app.get("/live", (req, res) => {
  res.json({
    status: "ALIVE",
  });
});

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
app.get("/version", (req, res) => {
  res.json({
    app: "RentPilot AI",
    version: "1.0.0",
    environment: process.env.NODE_ENV || "development",
  });
});
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(limiter);
app.disable("x-powered-by");

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

module.exports = app;