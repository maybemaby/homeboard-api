import { Router } from "express";
import asyncWrapper from "../../middleware/asyncWrapper";
import userController from "../../controllers/userController";
import { requestLogger } from "../../middleware/logging";

export const userRouter = Router();

userRouter.get("/:id", requestLogger, asyncWrapper(userController.getUser));
userRouter.delete(
  "/:id",
  requestLogger,
  asyncWrapper(userController.deleteUser)
);
