import { Router } from "express";
import { homeRouter } from "./homeRouter";
import { userRouter } from "./userRouter";
import { roommateRouter } from "../roommateRouter";

export const apiRouter = Router();

apiRouter.use("/v1/homes", homeRouter);
apiRouter.use("/v1/user", userRouter);
apiRouter.use("/v1/roommates", roommateRouter);
