import { Router, Handler } from "express";
import passport from "passport";
import { homeRouter } from "./homeRouter";
import { userRouter } from "./userRouter";
import { roommateRouter } from "./roommateRouter";
import { eventRouter } from "./eventRouter";
import taskRouter from "./taskRouter";

export const apiRouter = Router();

apiRouter.use(
  "/v1/homes",
  passport.authenticate("jwt", { session: false }) as Handler,
  homeRouter
);
apiRouter.use(
  "/v1/user",
  passport.authenticate("jwt", { session: false }) as Handler,
  userRouter
);
apiRouter.use(
  "/v1/roommates",
  passport.authenticate("jwt", { session: false }) as Handler,
  roommateRouter
);
apiRouter.use(
  "/v1/events",
  passport.authenticate("jwt", { session: false }) as Handler,
  eventRouter
);
apiRouter.use(
  "/v1/tasks",
  passport.authenticate("jwt", { session: false }) as Handler,
  taskRouter
);
