import Koa from "koa";

// This can be an environment variable or a setting loaded from your configuration
let isMaintenanceMode = false;

// Middleware function
export const maintenanceMiddleware = () => {
  return (_: Object, __?: string, descriptor?: PropertyDescriptor) => {
    const fn: Function = descriptor.value;
    descriptor.value = async function (ctx: any) {
      //   try {
      if (isMaintenanceMode == true) {
        ctx.status = 503;
        ctx.body =
          "The app is currently down for maintenance. Please try again later.";
      } else {
        ctx.status = 200;
        ctx.body = "The app is up and running";
      }
      //   } catch (err) {
      //     return this.UnAuthorized(ctx, "Invalid JWT Token");
      //   }
      return await fn.apply(this, [ctx]);
    };
  };
};

// Function to enable or disable maintenance mode
export const setMaintenanceMode = (mode: boolean) => {
  isMaintenanceMode = mode;
};
