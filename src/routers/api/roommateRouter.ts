import { Router } from "express";
import asyncWrapper from "../../middleware/asyncWrapper";
import roommateController from "../../controllers/roommateController";
import { requestLogger } from "../../middleware/logging";

export const roommateRouter = Router();

roommateRouter.get(
  "/:id",
  requestLogger,
  asyncWrapper(roommateController.getById)
);
roommateRouter.delete(
  "/:id",
  requestLogger,
  asyncWrapper(roommateController.deleteOne)
);
roommateRouter.put(
  "/:id/role",
  requestLogger,
  asyncWrapper(roommateController.putRole)
);
roommateRouter.post(
  "/",
  requestLogger,
  asyncWrapper(roommateController.createOne)
);
roommateRouter.get("/", asyncWrapper(roommateController.getAllByHome));
roommateRouter.get("/:id/tasks", asyncWrapper(roommateController.getTasks));
