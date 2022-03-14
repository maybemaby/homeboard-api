import { Router } from "express";
import asyncWrapper from "../../asyncWrapper";
import taskController from "../../controllers/taskController";

const taskRouter = Router();

taskRouter.get("/:taskId", asyncWrapper(taskController.getTask));
taskRouter.put("/:taskId/complete", asyncWrapper(taskController.completeTask));
taskRouter.post("/", asyncWrapper(taskController.createTask));
taskRouter.put("/:taskId/assignees", asyncWrapper(taskController.putAssignees));

export default taskRouter;
