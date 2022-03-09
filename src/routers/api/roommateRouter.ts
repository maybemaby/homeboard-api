import { Router } from "express";
import asyncWrapper from "../../asyncWrapper";
import roommateController from "../../controllers/roommateController";

export const roommateRouter = Router();

roommateRouter.get("/:id", asyncWrapper(roommateController.getById));
roommateRouter.delete("/:id", asyncWrapper(roommateController.deleteOne));
roommateRouter.post("/", asyncWrapper(roommateController.createOne));
roommateRouter.get("/", asyncWrapper(roommateController.getAllByHome));
roommateRouter.get("/:id/tasks", asyncWrapper(roommateController.getTasks));
