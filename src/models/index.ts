import Config from "@app/config";

export function loadModels() {
  let models;
  if (Config.DB_TYPE === "mongo") {
    models = require("@models/mongo");
  } else if (Config.DB_TYPE === "sql") {
    models = require("@models/sql");
  } else {
    throw new Error("Unsupported DB_TYPE");
  }
  return models;
}
