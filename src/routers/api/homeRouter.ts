import { Router } from "express";
import asyncWrapper from "../../middleware/asyncWrapper";
import homeController from "../../controllers/homeController";
import messageController from "../../controllers/messageController";
import { canViewHome } from "../../middleware/permissions";
import { requestLogger } from "../../middleware/logging";

export const homeRouter = Router();

homeRouter.get("/", asyncWrapper(homeController.getHomes));
homeRouter.get(
  "/:homeId",
  asyncWrapper(canViewHome),
  asyncWrapper(homeController.getHomeById)
);
homeRouter.post("/", requestLogger, asyncWrapper(homeController.postHome));
homeRouter.get(
  "/:homeId/messages",
  asyncWrapper(canViewHome),
  requestLogger,
  asyncWrapper(messageController.getMessagesByHome)
);
homeRouter.get(
  "/:homeId/messages/:messageId/replies",
  asyncWrapper(canViewHome),
  requestLogger,
  asyncWrapper(messageController.getMessageReplies)
);
homeRouter.post(
  "/:homeId/messages/:messageId/replies",
  asyncWrapper(canViewHome),
  requestLogger,
  asyncWrapper(messageController.postMessageReplies)
);
homeRouter.post(
  "/:homeId/messages",
  asyncWrapper(canViewHome),
  requestLogger,
  asyncWrapper(messageController.postMessage)
);
homeRouter.put(
  "/:homeId",
  asyncWrapper(canViewHome),
  requestLogger,
  asyncWrapper(homeController.putHome)
);
