import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { BaseController } from "./baseController";
import { Auth } from "../middlewares/auth.middleware";

class UserController extends BaseController {
  @Auth()
  async createUser(req: Request, res: Response) {
    try {
      const user = await UserService.createUser(req.body);
      this.success(res, user);
    } catch (error: any) {
      this.error(res, error.message);
    }
  }

  @Auth()
  async getUserById(req: Request, res: Response) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (user) {
        this.success(res, user);
      } else {
        this.error(res, "User not found", 404);
      }
    } catch (error: any) {
      this.error(res, error.message);
    }
  }

  @Auth()
  async updateUser(req: Request, res: Response) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      this.success(res, user);
    } catch (error: any) {
      this.error(res, error.message);
    }
  }

  @Auth()
  async deleteUser(req: Request, res: Response) {
    try {
      await UserService.deleteUser(req.params.id);
      this.success(res, { message: "User deleted" });
    } catch (error: any) {
      this.error(res, error.message);
    }
  }

  @Auth()
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await UserService.getAllUsers();
      this.success(res, users);
    } catch (error: any) {
      this.error(res, error.message);
    }
  }
}

export default new UserController();
