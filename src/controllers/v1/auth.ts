import Koa from "koa";
import bcrypt from "bcrypt";
import { HttpMethod } from "@app/types";
import { Route, getJwtToken } from "@app/utility";
import BaseController from "@app/controllers/base";
import { auth } from "@app/middleware/auth.middleware";
import { findUserByUsername, createUser } from "@app/models/user";
import { loadModels } from "@app/models";
const { UserTable } = loadModels();

class AuthController extends BaseController {
  @Route({ path: "/signup", method: HttpMethod.POST })
  public async userSignup(ctx: Koa.Context | any) {
    const { email, username, password } = ctx.request.body;
    if (!username || !password) {
      return this.BadRequest(ctx, "Username and password are required");
    }

    const existingUser = findUserByUsername(username);
    if (existingUser) {
      ctx.status = 409;
      ctx.body = "Username already exists";
      return;
    }
    try {
      const newUser = await createUser(email, username, password);
      const token = getJwtToken(newUser);
      ctx.status = 201;
      ctx.body = { token };
    } catch (error) {
      ctx.status = 500;
      ctx.body = "Internal Server Error";
    }
    return this.Ok(ctx, { message: ctx.body });
  }

  @Route({ path: "/login", method: HttpMethod.GET })
  @auth()
  public async userLogin(ctx: Koa.Context | any) {
    const { username, password } = ctx.request.body;
    if (!username || !password) {
      return this.BadRequest(ctx, "Username and password are required");
    }

    const existingUser = findUserByUsername(username);
    if (!existingUser) {
      return this.UnAuthorized(ctx, "Invalid Credentials");
    }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    if (!passwordMatch) {
      return this.UnAuthorized(ctx, "Invalid Credentials");
    }

    return this.Ok(ctx, { message: "service is up and running" });
  }
}

export default new AuthController();
