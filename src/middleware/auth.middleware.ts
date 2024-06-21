import config from "@app/config";
import { verifyToken } from "@app/utility";

export function adminAuthMiddleware() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const ctx = args[0];
      if (ctx.query.key !== config.ADMIN_SECRET) {
        ctx.status = 503;
        ctx.body = "You are not authorised";
      } else {
        await originalMethod.apply(this, args);
      }
    };
    return descriptor;
  };
}

export const auth = () => {
  return (_: Object, __?: string, descriptor?: PropertyDescriptor) => {
    const fn: Function = descriptor.value;
    descriptor.value = async function (ctx: any) {
      const token =
        (<string>ctx.request.headers &&
          ctx.request.headers["x-access-token"]) ||
        (ctx.request.query.token as string);
      if (!token) {
        return this.UnAuthorized(ctx, "Invalid JWT Token");
      }
      try {
        const response = await verifyToken(token);
        if (response && response.status && response.status === 401) {
          return this.UnAuthorized(ctx, "Invalid JWT Token");
        }
        console.log("ctx.request.user : ", ctx.request.user);
        ctx.request.user = response;
      } catch (err) {
        return this.UnAuthorized(ctx, "Invalid JWT Token");
      }
      return await fn.apply(this, [ctx]);
    };
  };
};
