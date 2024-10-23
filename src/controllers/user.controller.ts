// src/controllers/user.controller.ts
import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { UserTable } from "../models";

class UserController extends BaseController {
  async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserTable.find();
      return this.successResponse(res, users);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserTable.findById(req.params.id);
      if (!user)
        return this.errorResponse(res, { message: "User not found" }, 404);
      return this.successResponse(res, user);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserTable.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      if (!user)
        return this.errorResponse(res, { message: "User not found" }, 404);
      return this.successResponse(res, user);
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserTable.findByIdAndDelete(req.params.id);
      if (!user)
        return this.errorResponse(res, { message: "User not found" }, 404);
      return this.successResponse(res, 200, "User deleted successfully");
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }
}

export default new UserController();
