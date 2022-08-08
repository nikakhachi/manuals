import { ThrottlerException } from "@nestjs/throttler";
import { getCache, setCache } from "src/cache";

const getKeyForUserRateLimiting = (id: number) => `RL_${id}`;
const RATE_LIMITING_WINDOW_SECONDS = 10;
const RATE_LIMIT = 40;

const handleUserRateLimiting = (id: number) => {
  const userRequestTimestamps = getCache(
    getKeyForUserRateLimiting(id)
  ) as number[];
  const userRequestTimestampsInWindow = (userRequestTimestamps || []).filter(
    (timestamp) =>
      timestamp + RATE_LIMITING_WINDOW_SECONDS * 1000 > new Date().getTime()
  );
  if (userRequestTimestampsInWindow.length > RATE_LIMIT) {
    throw new ThrottlerException();
  } else {
    setCache(
      getKeyForUserRateLimiting(id),
      userRequestTimestampsInWindow.concat([new Date().getTime()]),
      RATE_LIMITING_WINDOW_SECONDS
    );
  }
};

export { handleUserRateLimiting };
