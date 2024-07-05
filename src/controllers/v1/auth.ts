import Koa from "koa";
import bcrypt from "bcrypt";
import { HttpMethod } from "@app/types";
import { Route, decodeJwtToken } from "@app/utility";
import BaseController from "@app/controllers/base";
import { Auth } from "@app/middleware/auth.middleware";
import { TokenService } from "@app/services/v1";
import { UserService } from "@app/services/v1";
import { UserTable } from "@app/models/mongo";

class AuthController extends BaseController {
  /**
   * @description This method is used for user signup
   * @param ctx
   * @returns
   */
  @Route({ path: "/signup", method: HttpMethod.POST })
  public async userSignup(ctx: Koa.Context | any) {
    const { email, username, password } = ctx.request.body;
    if (!username || !password) {
      return this.BadRequest(ctx, "Username and password are required");
    }

    const emailExists = await UserService.ifEmailExists(email);
    if (emailExists) {
      return this.BadRequest(ctx, "Email already exists");
    }
    const usernameExists = await UserService.ifUserNameExists(username);
    if (usernameExists) {
      return this.BadRequest(ctx, "Username already exists");
    }
    try {
      const newUser = await UserService.userSignup(ctx.request.body);
      const { token, refreshToken } = await TokenService.generateToken(newUser);
      ctx.status = 201;
      ctx.body = { token, refreshToken };
    } catch (error) {
      ctx.status = 500;
      ctx.body = "Internal Server Error";
    }
    return this.Ok(ctx, { message: ctx.body });
  }

  /**
   * @description This method is used for user login using username and password
   * @param ctx
   * @returns
   */
  @Route({ path: "/password-login", method: HttpMethod.GET })
  public async userPasswordLogin(ctx: Koa.Context | any) {
    try {
      const { username, password } = ctx.request.body;
      if (!username || !password) {
        return this.BadRequest(ctx, "Username and password are required");
      }

      const userIfExists = await UserTable.findOne({ username });
      if (!userIfExists) {
        return this.UnAuthorized(ctx, "Invalid Credentials");
      }

      const passwordMatch = await bcrypt.compare(
        password,
        userIfExists.password
      );
      if (!passwordMatch) {
        return this.UnAuthorized(ctx, "Invalid Credentials");
      }

      const { token, refreshToken } = await TokenService.generateToken(
        userIfExists
      );
      return this.Ok(ctx, {
        message: "service is up and running",
        data: { token, refreshToken },
      });
    } catch (error) {
      return this.BadRequest(ctx, error.message);
    }
  }

  /**
   * @description This method is used for user login using JWT token
   * @param ctx
   * @returns
   */
  @Route({ path: "/login", method: HttpMethod.GET })
  @Auth()
  public async userLogin(ctx: Koa.Context | any) {
    try {
      const { user } = ctx.request;
      const userIfExists = await UserTable.findOne({ _id: user._id });
      if (!userIfExists) {
        return this.BadRequest(ctx, "User Not Found");
      }

      return this.Ok(ctx, { message: "service is up and running" });
    } catch (error) {
      return this.BadRequest(ctx, error.message);
    }
  }

  /**
   * @description This method is used to create refresh token
   * @param ctx
   * @returns
   */
  @Route({ path: "/refresh-token", method: HttpMethod.POST })
  public async refreshToken(ctx: any) {
    const { refreshToken } = ctx.request.body;
    if (!refreshToken || refreshToken == "")
      return this.BadRequest(ctx, "Refresh Token not found.");

    let user: any;
    try {
      user = decodeJwtToken(refreshToken);
    } catch (error) {
      return this.UnAuthorized(ctx, "Refresh Token Expired");
    }
    user = await UserTable.findOne({ _id: user._id });
    if (!user) {
      return this.BadRequest(ctx, "User Not Found");
    }
    const { token, refreshToken: newRefreshToken } =
      await TokenService.generateToken(user);
    return this.Ok(ctx, { token, refreshToken: newRefreshToken });
  }
}

export default new AuthController();
