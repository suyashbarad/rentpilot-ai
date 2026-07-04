require("dotenv").config();
console.log("Password length:", process.env.DB_PASSWORD?.length);
console.log("Password chars:", JSON.stringify(process.env.DB_PASSWORD));
// console.log("DB_HOST:", process.env.DB_HOST);
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "Loaded ✅" : "Not Loaded ❌");
// console.log("DB_NAME:", process.env.DB_NAME);

const app = require("./app");

// Connect to MySQL
require("./config/db");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});