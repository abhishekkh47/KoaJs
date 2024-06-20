import Koa from "koa";
import { HttpMethod } from "@app/types";
import { Route } from "@app/utility";
import BaseController from "@app/controllers/base";
import {
  maintenanceMiddleware,
  setMaintenanceMode,
} from "@middleware/maintenance.middleware";

class HealthCheckController extends BaseController {
  @Route({ path: "/healthcheck", method: HttpMethod.GET })
  public async healthCheck(ctx: Koa.Context | any) {
    return this.Ok(ctx, { message: "service is up and running" });
  }

  @Route({ path: "/maintenance", method: HttpMethod.GET })
  @maintenanceMiddleware()
  public async toggleMaintenanceMode(ctx: Koa.Context | any) {
    const mode = ctx.query.mode === "on";
    setMaintenanceMode(mode);
    ctx.body = `Maintenance mode is now ${mode ? "enabled" : "disabled"}`;
    return this.Ok(ctx, { message: "service is up and running" });
  }
}

export default new HealthCheckController();
