import { Router } from "express";
import passport from "passport";
import asyncWrapper from "../../middleware/asyncWrapper";
import userController from "../../controllers/userController";

export const userRouter = Router();

userRouter.get(
  "/:id",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  passport.authenticate("jwt", { session: false }),
  asyncWrapper(userController.getUser)
);
userRouter.post(
  "/",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  userController.postUser
);
userRouter.delete("/:id", asyncWrapper(userController.deleteUser));
userRouter.post("/auth/login",
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  userController.login
);
