import { Router } from "express";
import asyncWrapper from "../../asyncWrapper";
import userController from "../../controllers/userController";

export const userRouter = Router();

userRouter.get("/:id", asyncWrapper(userController.getUser));
userRouter.post("/", asyncWrapper(userController.postUser));
userRouter.delete("/:id", asyncWrapper(userController.deleteUser));
