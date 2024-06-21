import * as Koa from "koa";

import { logger } from "@app/utility";

export const errorHandler = async (ctx: Koa.Context | any, next: Koa.Next) => {
  try {
    await next();
  } catch (e) {
    let message =
      e.status === 500 ? "Internal server error" : e.message || "Unknown";
    const status = e.status || 500;
    const messages = e.messages || [];

    if (status === 500) {
      logger.error(e);
    }

    ctx.status = status;
    ctx.body = {
      status: status,
      code: status,
      message,
      messages,
      path: ctx.path,
    };
    return ctx;
  }
};

export class NetworkError extends Error {
  status: number;
  constructor(message: any, status: number) {
    super(message);
    this.status = status;
  }
}
