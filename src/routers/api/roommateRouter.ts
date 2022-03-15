import { Router } from "express";
import asyncWrapper from "../../middleware/asyncWrapper";
import roommateController from "../../controllers/roommateController";

export const roommateRouter = Router();

roommateRouter.get("/:id", asyncWrapper(roommateController.getById));
roommateRouter.delete("/:id", asyncWrapper(roommateController.deleteOne));
roommateRouter.put("/:id/role", asyncWrapper(roommateController.putRole));
roommateRouter.post("/", asyncWrapper(roommateController.createOne));
roommateRouter.get("/", asyncWrapper(roommateController.getAllByHome));
roommateRouter.get("/:id/tasks", asyncWrapper(roommateController.getTasks));
