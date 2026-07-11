const { createClient } = require("redis");

const redisHost = process.env.REDIS_HOST || "localhost";

const client = createClient({
  url: `redis://${redisHost}:6379`
});

client.on("connect", () => {
  console.log("✅ Redis Connected");
});

client.on("error", (err) => {
  console.error("Redis Error:", err.message);
});

(async () => {
  await client.connect();
})();

module.exports = client;