import { Router } from "express";
import { homeRouter } from "./homeRouter";
import { userRouter } from "./userRouter";

export const apiRouter = Router();

apiRouter.use("/v1/homes", homeRouter);
apiRouter.use("/v1/user", userRouter);
