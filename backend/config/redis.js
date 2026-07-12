const { createClient } = require("redis");

const redisEnabled = process.env.REDIS_ENABLED === "true";

const redis = {
  isOpen: false,

  async get() {
    return null;
  },

  async set() {
    return null;
  },

  async del() {
    return null;
  },
};

if (redisEnabled) {
  const redisUrl =
    process.env.REDIS_URL ||
    `redis://${process.env.REDIS_HOST || "localhost"}:${process.env.REDIS_PORT || 6379}`;

  const client = createClient({
    url: redisUrl,
  });

  client.on("connect", () => {
    console.log("Redis connected");
  });

  client.on("error", (error) => {
    console.error("Redis error:", error.message);
  });

  client.connect().catch((error) => {
    console.error("Redis connection failed:", error.message);
  });

  module.exports = client;
} else {
  console.log("Redis disabled");
  module.exports = redis;
}
