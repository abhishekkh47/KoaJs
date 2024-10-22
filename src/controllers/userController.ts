import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { BaseController } from "./baseController";

export class UserController extends BaseController {
  private userService = new UserService();

  public async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      return this.successResponse(res, "Users fetched successfully", users);
    } catch (error: any) {
      return this.errorResponse(res, error.message, 500);
    }
  }

  public async getUserById(req: Request, res: Response) {
    try {
      const user = await this.userService.getUserById(req.params.id);
      return this.successResponse(res, "User fetched successfully", user);
    } catch (error: any) {
      return this.errorResponse(res, error.message, 404);
    }
  }

  public async updateUser(req: Request, res: Response) {
    try {
      const updatedUser = await this.userService.updateUser(
        req.params.id,
        req.body
      );
      return this.successResponse(
        res,
        "User updated successfully",
        updatedUser
      );
    } catch (error: any) {
      return this.errorResponse(res, error.message, 400);
    }
  }

  public async deleteUser(req: Request, res: Response) {
    try {
      await this.userService.deleteUser(req.params.id);
      return this.successResponse(res, "User deleted successfully");
    } catch (error: any) {
      return this.errorResponse(res, error.message, 400);
    }
  }
}
