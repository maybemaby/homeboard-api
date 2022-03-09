import { Request, Response } from "express";
import { IEvent } from "../models/Event";
import EventsService from "../services/EventsService";

async function getEventById(req: Request, res: Response) {
  const id = req.params.eventId;
  const event = await EventsService.getById(id);
  if (event) {
    res.status(200).json(event);
  } else {
    res.sendStatus(400);
  }
}

async function postEvent(req: Request, res: Response) {
  const data = req.body as IEvent;
  try {
    const event = await EventsService.createOne(data);
    res.status(201).json(event);
  } catch {
    res.sendStatus(400);
  }
}

async function deleteEvent(req: Request, res: Response) {
  const id = req.params.eventId;
  try {
    await EventsService.deleteOne(id);
    res.sendStatus(202);
  } catch {
    res.sendStatus(400);
  }
}

// PUT /events/:eventId
async function putEvent(req: Request, res: Response) {
  const id = req.params.eventId;
  const data = req.body as IEvent;
  try {
    const updated = await EventsService.editOne(id, data);
    res.status(201).json(updated);
  } catch {
    res.sendStatus(400);
  }
}

export default {
  getEventById,
  postEvent,
  deleteEvent,
  putEvent,
};
