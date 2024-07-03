import "module-alias/register";
import cors from "@koa/cors";
import http from "http";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import Mount from "koa-mount";
import DotEnv from "dotenv";
import monitor from "koa-monitor";
DotEnv.config();

import Config from "@app/config";
import { logger } from "@app/utility";
import {
  errorHandler,
  notFoundHandler,
  maintenanceModeHandler,
  rateLimiterMiddleware,
} from "@app/middleware";
import Api from "@app/controllers";
import views from "koa-views";
import { mongodb, mysql, pool } from "@app/db";
import helmet from "koa-helmet";

const server = (async () => {
  try {
    const app = new Koa();
    const appServer = http.createServer(app.callback());
    // app statistics and monitoring
    app.use(helmet());
    app.use(monitor(appServer, { path: "/status" }));

    const render = views(__dirname + "/views", { extension: "pug" });

    app.use(render);
    // Enable cors
    app.use(cors());
    app.use(async (ctx, next) => {
      console.log(ctx.path, "path");
      await next();
    });
    // app.use(bodyparser());
    app.use(
      bodyParser({
        jsonLimit: "50mb",
      })
    );

    app.use(rateLimiterMiddleware);
    // Handle exception
    app.use(errorHandler);
    // handle maintenance mode
    app.use(maintenanceModeHandler);

    if (Config.DB_TYPE === "mongo") {
      await mongodb();
    } else if (Config.DB_TYPE === "sql") {
      await mysql();
    } else if (Config.DB_TYPE === "postgres") {
      await pool();
    } else {
      console.log("Please specify the Database to be used");
    }

    app.use(Mount("/api", Api));

    // Request url not found
    app.use(notFoundHandler);

    const port = Config.PORT;

    appServer.listen(port);

    logger.info(`Server running on port ${port}`);
  } catch (e) {
    logger.error(`Server startup failed: ${e.message}`);
  }

  process.on("uncaughtException", function (error: any) {
    console.log(error, "uncaught exception");
  });
})();

export default server;
