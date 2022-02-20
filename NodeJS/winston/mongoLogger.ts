import winston from "winston";
import { MongoDB } from "winston-mongodb";

// https://github.com/winstonjs/winston-mongodb/issues/97

const mongoLogger = winston.createLogger({
  levels: {
    info: 0,
  },
  format: winston.format.combine(winston.format.metadata()),
});

mongoLogger.add(
  new MongoDB({
    options: { useUnifiedTopology: true },
    level: "info",
    db: process.env.MONGO_URL,
    collection: "rsApi-logs",
  })
);

mongoLogger.info("RS-API request log", { ...logObject });
