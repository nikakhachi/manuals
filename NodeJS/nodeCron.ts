import cron from "node-cron";
import logger from "../utils/logger";

export const initScheduledJobs = () => {
  try {
    cron.schedule("30 16 * * *", cronFunction);
  } catch (e) {
    logger.error("CRON: scheduling was failed");
  }
};
