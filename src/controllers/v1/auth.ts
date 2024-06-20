import Koa from "koa";
import { HttpMethod } from "@app/types";
import { Route } from "@app/utility";
import BaseController from "@app/controllers/base";

class AuthController extends BaseController {
  @Route({ path: "/signup", method: HttpMethod.GET })
  public async healthCheck(ctx: Koa.Context | any) {
    return this.Ok(ctx, { message: "service is up and running" });
  }
}

export default new AuthController();
