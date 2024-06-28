import { RateLimiterMemory } from "rate-limiter-flexible";
import Koa from "koa";

const rateLimiter = new RateLimiterMemory({
  points: 10, // 10 requests
  duration: 60, // per 60 seconds by IP
});

export const rateLimiterMiddleware: Koa.Middleware = async (ctx, next) => {
  try {
    await rateLimiter.consume(ctx.ip); // Consume 1 point for each request from this IP

    await next();
  } catch (error) {
    ctx.status = 429; // Too Many Requests
    ctx.body = "Rate limit exceeded";
  }
};
