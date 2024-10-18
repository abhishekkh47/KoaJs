import { Request, Response, NextFunction } from "express";
import { UserService } from "../services/user.service";

export class UserController {
  // Get all users
  static async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  }

  // Create new user
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      next(err);
    }
  }

  // Get user by ID
  static async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json(user);
    } catch (err) {
      next(err);
    }
  }

  // Update user by ID
  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      await UserService.updateUser(req.params.id, req.body);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }

  // Delete user by ID
  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      await UserService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
