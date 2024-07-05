import Config from "@app/config";
import * as MongoModels from "./mongo";
import * as SqlModels from "./sql";

export function loadModels() {
  if (Config.DB_TYPE === "mongo") {
    return MongoModels;
  } else if (Config.DB_TYPE === "sql") {
    return SqlModels;
  } else {
    throw new Error("Unsupported DB_TYPE");
  }
}
