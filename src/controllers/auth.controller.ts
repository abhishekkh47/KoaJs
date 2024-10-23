import { Request, Response } from "express";
import { BaseController } from "./base.controller";
import { UserTable } from "../models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController extends BaseController {
  async signup(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new UserTable({ name, email, password: hashedPassword });
      await user.save();

      return this.successResponse(res, {
        message: "User created successfully",
      });
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    try {
      const user = await UserTable.findOne({ email });
      if (!user)
        return this.errorResponse(res, { message: "User not found" }, 404);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return this.errorResponse(res, { message: "Invalid credentials" }, 401);

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );
      return this.successResponse(res, { token });
    } catch (error) {
      return this.errorResponse(res, error);
    }
  }
}

export default new AuthController();
