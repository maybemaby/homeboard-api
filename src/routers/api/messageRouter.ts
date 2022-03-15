import { Router } from "express";
import asyncWrapper from "../../middleware/asyncWrapper";
import messageController from "../../controllers/messageController";

export const messageRouter = Router();

messageRouter.post("/", asyncWrapper(messageController.postMessage));
