import { Router } from "express";
import UserController from "../controllers/userController";

const router = Router();

router.get("/users/", UserController.getAllUsers);
router.post("/users/", UserController.createUser);
router.get("/users/:id", UserController.getUserById);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

export default router;
