import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();
const userController = new UserController();

// Get all users
router.get("/", authMiddleware, async (req, res, next) => {
  try {
    await userController.getAllUsers(req, res);
  } catch (error) {
    next(error); // Pass error to the error handler middleware
  }
});

// Get user by ID
router.get("/:id", authMiddleware, async (req, res, next) => {
  try {
    await userController.getUserById(req, res);
  } catch (error) {
    console.log("error:", error);
    next(error); // Pass error to the error handler middleware
  }
});

// Create a new user
// router.post("/", authMiddleware, async (req, res, next) => {
//   try {
//     await userController.createUser(req, res);
//   } catch (error) {
//     next(error); // Pass error to the error handler middleware
//   }
// });

// Update user
router.put("/:id", authMiddleware, async (req, res, next) => {
  try {
    await userController.updateUser(req, res);
  } catch (error) {
    next(error); // Pass error to the error handler middleware
  }
});

// Delete user
router.delete("/:id", authMiddleware, async (req, res, next) => {
  try {
    await userController.deleteUser(req, res);
  } catch (error) {
    next(error); // Pass error to the error handler middleware
  }
});

export default router;
