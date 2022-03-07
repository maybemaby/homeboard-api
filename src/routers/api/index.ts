import { Router } from "express";
import { homeRouter } from "./homeRouter";
import { userRouter } from "./userRouter";
import { roommateRouter } from "./roommateRouter";
import { messageRouter } from "./messageRouter";
import { eventRouter } from "./eventRouter";
import taskRouter from "./taskRouter";

export const apiRouter = Router();

apiRouter.use("/v1/homes", homeRouter);
apiRouter.use("/v1/user", userRouter);
apiRouter.use("/v1/roommates", roommateRouter);
apiRouter.use("/v1/messages", messageRouter);
apiRouter.use("/v1/events", eventRouter);
apiRouter.use("/v1/tasks", taskRouter);
