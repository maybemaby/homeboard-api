import { Router } from "express";
import userController from "../../controllers/userController";

export const authRouter = Router();

authRouter.post("/signup", userController.postUser);
authRouter.post("/login", userController.login);
