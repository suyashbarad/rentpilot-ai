require("dotenv").config();

const logger = require("./utils/logger");
const app = require("./app");

// Connect to MySQL
require("./config/db");

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
});