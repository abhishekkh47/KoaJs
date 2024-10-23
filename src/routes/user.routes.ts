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
    const users = await userController.getAllUsers(req, res);
    res.json(users); // Send the response here
  })
);
router.get(
  "/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const users = await userController.getUserById(req, res);
    res.json(users); // Send the response here
  })
);
// router.post(
//   "/",
//   authMiddleware,
//   asyncHandler(userController.createUser.bind(userController))
// );
router.put(
  "/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const users = await userController.updateUser(req, res);
    res.json(users); // Send the response here
  })
);
router.delete(
  "/:id",
  authMiddleware,
  asyncHandler(async (req, res) => {
    const users = await userController.deleteUser(req, res);
    res.json(users); // Send the response here
  })
);

export default router;
