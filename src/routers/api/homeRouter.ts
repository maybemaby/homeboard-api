import { Router } from "express";
import asyncWrapper from "../../middleware/asyncWrapper";
import homeController from "../../controllers/homeController";
import messageController from "../../controllers/messageController";
import { canViewHome } from "../../middleware/permissions";

export const homeRouter = Router();

homeRouter.get("/", asyncWrapper(homeController.getHomes));
homeRouter.get(
  "/:homeId",
  asyncWrapper(canViewHome),
  asyncWrapper(homeController.getHomeById)
);
homeRouter.post("/", asyncWrapper(homeController.postHome));
homeRouter.get(
  "/:homeId/messages",
  asyncWrapper(canViewHome),
  asyncWrapper(messageController.getMessagesByHome)
);
homeRouter.post("/:homeId/messages", asyncWrapper(canViewHome), asyncWrapper(messageController.postMessage));
homeRouter.put(
  "/:homeId",
  asyncWrapper(canViewHome),
  asyncWrapper(homeController.putHome)
);
