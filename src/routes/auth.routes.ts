import { Router, Request, Response, NextFunction } from "express";
import authController from "../controllers/auth.controller"; // Adjust the path if necessary

const router = Router();

// Async handler to manage errors and responses
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };

// Define routes
router.post(
  "/signup",
  asyncHandler(authController.signup.bind(authController))
);
router.post("/login", asyncHandler(authController.login.bind(authController)));

export default router;
