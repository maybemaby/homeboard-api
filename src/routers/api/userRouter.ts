import { Router } from "express";
import asyncWrapper from "../../middleware/asyncWrapper";
import userController from "../../controllers/userController";

export const userRouter = Router();

userRouter.get("/:id", asyncWrapper(userController.getUser));
userRouter.post("/", asyncWrapper(userController.postUser));
userRouter.delete("/:id", asyncWrapper(userController.deleteUser));
userRouter.post("/auth/login", asyncWrapper(userController.login));
