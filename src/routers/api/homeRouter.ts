import { Router } from "express";
import homeController from "../../controllers/homeController";

export const homeRouter = Router();

homeRouter.get("/", homeController.getHomes);

homeRouter.get("/:homeId", homeController.getHomeById);
homeRouter.get("/:homeId/messages", homeController.getMessages);
homeRouter.post("/:homeId/messages", homeController.postHome);
homeRouter.post("/", homeController.postHome);
