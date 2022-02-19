import { Router } from "express";
import asyncWrapper from "../../asyncWrapper";
import eventController from "../../controllers/eventController";

export const eventRouter = Router();

eventRouter.get("/:eventId", asyncWrapper(eventController.getEventById));
eventRouter.post("/", asyncWrapper(eventController.postEvent));
eventRouter.delete("/:eventId", asyncWrapper(eventController.deleteEvent));
