const Redis = require("ioredis");

const cacheClient = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASSWORD,
});

cacheClient.on("connect", () => {
  console.log("redis connected");
});

cacheClient.on("error", () => {
  console.log("error in running redis");
});

module.exports = cacheClient;
