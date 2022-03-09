import { Request, Response } from "express";
import { IRoommate } from "../models/Roommate";
import RoommateService from "../services/RoommateService";
import TaskService from "../services/TaskService";

async function getById(req: Request, res: Response) {
  const id = req.params.id;
  const roommate = await RoommateService.getById(id);
  if (roommate) {
    res.status(200).json(roommate).send();
  } else {
    res.status(400).send("Roommate not found");
  }
}

async function getAllByHome(req: Request, res: Response) {
  const homeId = req.query.h;
  if (typeof homeId === "string") {
    const roommates = await RoommateService.getAll(homeId);
    res.status(200).json(roommates).send();
  } else {
    res.status(400).send("Page not Found");
  }
}

async function createOne(req: Request, res: Response) {
  const data = req.body as IRoommate;
  try {
    const roommate = await RoommateService.createOne(data);
    res.status(201).json(roommate).send();
  } catch {
    res.status(400).send("Invalid request");
  }
}

async function deleteOne(req: Request, res: Response) {
  const id = req.params.id;
  try {
    await RoommateService.deleteOne(id);
    res.status(202).send();
  } catch {
    res.status(400).send("Invalid request");
  }
}

// GET roommates/:id/tasks?start=&size=&incomplete=true
async function getTasks(req: Request, res: Response) {
  const id = req.params.id;
  const start = req.query.start ? String(req.query.start) : req.query.start;
  const size = parseInt(String(req.query.size));
  const incomplete = String(req.query.incomplete).toLowerCase() === "true";
  try {
    if (!incomplete) {
      const data = await TaskService.getAll(
        {
          assignees: {
            every: {
              roommateId: id,
            },
          },
        },
        start,
        size
      );
      res.status(200).json(data);
    } else {
      const data = await TaskService.getAll({
        assignees: {
          every: {
            roommateId: id,
          },
        },
        complete: false,
      });
      res.status(200).json(data);
    }
  } catch {
    res.sendStatus(400);
  }
}

export default {
  getById,
  getAllByHome,
  createOne,
  deleteOne,
  getTasks,
};
