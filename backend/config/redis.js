const { createClient } = require("redis");

const client = createClient({
  url: "redis://redis:6379"
});

client.on("connect", () => {
  console.log("✅ Redis Connected");
});

client.on("error", (err) => {
  console.error("Redis Error:", err);
});

(async () => {
  await client.connect();
})();

module.exports = client;