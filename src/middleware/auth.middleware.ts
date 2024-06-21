import config from "@app/config";

export function adminAuthMiddleware() {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const ctx = args[0];
      if (ctx.query.key !== config.ADMIN_KEY) {
        ctx.status = 503;
        ctx.body = "You are not authorised";
      } else {
        await originalMethod.apply(this, args);
      }
    };
    return descriptor;
  };
}
