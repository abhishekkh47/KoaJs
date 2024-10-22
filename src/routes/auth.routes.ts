import express from "express";
import { AuthController } from "../controllers/authController";

const authController = new AuthController();
const router = express.Router();

// Wrapping the async methods with a try/catch to ensure proper error handling
router.post("/signup", async (req, res, next) => {
  try {
    await authController.signup(req, res);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    await authController.login(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
