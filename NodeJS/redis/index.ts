import { createClient } from "redis";

// const client = createClient("6379", redisUrl);
const client = createClient();

client.connect();

client.on("error", (error) => {});

// client.configSet("notify-keyspace-events", "Ex");

// client.subscribe("__keyevent@0__:expired", "beelineAccessToken");

// client.on("message", function (channel, key) {
//   // do what you want when a value is updated
//   console.log("EVENT EMITTED", channel, key);
// });

const getCache = async (key) => {
  const data = await client.get(key);
  return JSON.parse(data);
};

const setCache = async (key, value, expire) => {
  await client.set(key, JSON.stringify(value), { EX: expire });
};
