import winston from "winston";

export const logger = winston.createLogger({
  level: "info", // Set log level
  format: winston.format.json(), // JSON format for log messages
  transports: [new winston.transports.Console()],
});
