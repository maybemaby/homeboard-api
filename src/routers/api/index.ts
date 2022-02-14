import { Router } from "express";
import { homeRouter } from "./homeRouter";

export const apiRouter = Router();

apiRouter.use("/v1/homes", homeRouter);
