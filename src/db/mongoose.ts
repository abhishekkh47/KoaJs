import mongoose from "mongoose";
import config from "@app/config";
import { logger } from "@app/utility";

export const mongodb = async () => {
  mongoose.connect(config.MONGO_DB_PATH);

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.once("open", () => {
    logger.info("Connected to MongoDB");
  });
};
