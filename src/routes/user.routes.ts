import { Router, Request, Response, NextFunction } from "express";
import userController from "../controllers/user.controller";
import { authMiddleware } from "@app/middlewares";

const router = Router();

// Async handler utility
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };

// Define user CRUD routes with authentication
router.get(
  "/",
  authMiddleware,
  asyncHandler(async (req, res) => {
    await userController.getAllUsers(req, res);
  })
);

router.get(
  "/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    await userController.getUserById(req, res);
  })
);

router.put(
  "/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    await userController.updateUser(req, res);
  })
);

router.delete(
  "/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    await userController.deleteUser(req, res);
  })
);

export default router;
