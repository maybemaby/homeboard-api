import { Router } from "express";
import passport from "passport";
import asyncWrapper from "../../middleware/asyncWrapper";
import userController from "../../controllers/userController";

export const userRouter = Router();

userRouter.get("/:id", asyncWrapper(userController.getUser));
userRouter.post(
  "/",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  passport.authenticate("signup", { session: false }),
  userController.postUser
);
userRouter.delete("/:id", asyncWrapper(userController.deleteUser));
userRouter.post("/auth/login", asyncWrapper(userController.login));
