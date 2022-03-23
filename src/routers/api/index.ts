import { Router, Handler } from "express";
import passport from "passport";
import { homeRouter } from "./homeRouter";
import { userRouter } from "./userRouter";
import { roommateRouter } from "./roommateRouter";
import { messageRouter } from "./messageRouter";
import { eventRouter } from "./eventRouter";
import taskRouter from "./taskRouter";

export const apiRouter = Router();

apiRouter.use("/v1/homes", passport.authenticate("jwt", { session: false }) as Handler, homeRouter);
apiRouter.use("/v1/user", userRouter);
apiRouter.use("/v1/roommates", passport.authenticate("jwt", { session: false }) as Handler, roommateRouter);
apiRouter.use("/v1/messages", passport.authenticate("jwt", { session: false }) as Handler, messageRouter);
apiRouter.use("/v1/events", passport.authenticate("jwt", { session: false }) as Handler, eventRouter);
apiRouter.use("/v1/tasks", passport.authenticate("jwt", { session: false }) as Handler, taskRouter);
