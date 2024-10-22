import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { BaseController } from "./baseController";

export class AuthController extends BaseController {
  private authService = new AuthService();

  public async signup(req: Request, res: Response) {
    try {
      const result = await this.authService.signup(req.body);
      return this.successResponse(res, "Signup successful", result);
    } catch (error: any) {
      return this.errorResponse(res, error.message, 400);
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const result = await this.authService.login(req.body);
      return this.successResponse(res, "Login successful", result);
    } catch (error: any) {
      return this.errorResponse(res, error.message, 400);
    }
  }
}
