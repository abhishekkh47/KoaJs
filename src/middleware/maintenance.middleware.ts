import Koa from "koa";

let isMaintenanceMode = false;

export const maintenanceModeHandler: Koa.Middleware = async (ctx, next) => {
  if (isMaintenanceMode && ctx.path !== "/api/admin/maintenance") {
    ctx.status = 503;
    ctx.body = "App under maintenance";
  } else {
    await next();
  }
};

export const setMaintenanceMode = (mode: boolean) => {
  isMaintenanceMode = mode;
};
