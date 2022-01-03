import winston, { transport, Logger } from "winston";

const { combine, colorize, json, errors, printf, timestamp, metadata, simple } =
  winston.format;

const PRODUCTION_ENV: boolean = process.env.NODE_ENV === "production";
const TESTING_ENV: boolean = process.env.NODE_ENV === "testing";

const devFormat = printf(
  ({ timestamp, level, message, stack }: any) =>
    `${timestamp} ${level}: ${stack || message}`
);

const prodFormat = printf(({ level, message, stack, metadata }: any) => {
  let metadt = "";
  if (JSON.stringify(metadata) !== "{}") {
    metadt = JSON.stringify(metadata, null, 2);
  }
  return `[${level.toUpperCase()}] ${stack || message} ${metadt}`;
});

const ConsoleTransport: transport = new winston.transports.Console({
  level: PRODUCTION_ENV ? "info" : "debug",
  format:
    !PRODUCTION_ENV && !TESTING_ENV
      ? combine(
          colorize(),
          timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
          errors({ stack: "true" }),
          metadata({ fillExcept: ["message", "level", "timestamp"] }),
          devFormat
        )
      : combine(
          errors({ stack: "true" }),
          metadata({ fillExcept: ["message", "level", "timestamp"] }),
          prodFormat
        ),
});

const ErrorLogsTransport: transport = new winston.transports.File({
  level: "error",
  filename: "logs/errors.log",
  format: combine(timestamp(), json()),
});

const logger: Logger = winston.createLogger({
  transports: [ConsoleTransport, ErrorLogsTransport],
});

export default logger;
