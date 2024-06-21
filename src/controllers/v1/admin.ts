import Koa from "koa";
import { HttpMethod } from "@app/types";
import { Route } from "@app/utility";
import BaseController from "@app/controllers/base";
import { setMaintenanceMode } from "@middleware/maintenance.middleware";
import { adminAuthMiddleware } from "@app/middleware/auth.middleware";

class HealthCheckController extends BaseController {
  @Route({ path: "/admin/healthcheck", method: HttpMethod.GET })
  @adminAuthMiddleware()
  public async healthCheck(ctx: Koa.Context | any) {
    return this.Ok(ctx, { message: "service is up and running" });
  }

  @Route({ path: "/admin/maintenance", method: HttpMethod.GET })
  @adminAuthMiddleware()
  public async toggleMaintenanceMode(ctx: Koa.Context | any) {
    const mode = ctx.query.mode === "on";
    setMaintenanceMode(mode);
    ctx.body = `Maintenance mode is now ${mode ? "enabled" : "disabled"}`;
    return this.Ok(ctx, { message: ctx.body });
  }
}

export default new HealthCheckController();
