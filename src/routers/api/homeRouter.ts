import { Router } from "express";
import asyncWrapper from "../../asyncWrapper";
import homeController from "../../controllers/homeController";

export const homeRouter = Router();

homeRouter.get("/", asyncWrapper(homeController.getHomes));

homeRouter.get("/:homeId", asyncWrapper(homeController.getHomeById));
homeRouter.post("/", asyncWrapper(homeController.postHome));
