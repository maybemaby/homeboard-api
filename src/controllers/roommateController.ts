import { Request, Response } from "express";
import { IRoommate, RoommateRole } from "../models/Roommate";
import RoommateService from "../services/RoommateService";
import TaskService from "../services/TaskService";
import { IUser } from "../models/User";
import { errorLogger } from "../middleware/logging";

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
  // JWT protected route will have user token
  data.userId = (req.user as IUser).id;
  try {
    const roommate = await RoommateService.createOne(data);
    res.status(201).json(roommate).send();
  } catch (err) {
    if (err instanceof Error) {
      errorLogger(err, false, req);
      if (err.message.includes("User already has a profile")) {
        res.status(400).send(err.message);
        return;
      }
    }
    res.status(400).send("Invalid request");
  }
}

async function deleteOne(req: Request, res: Response) {
  const id = req.params.id;
  try {
    await RoommateService.deleteOne(id);
    res.status(202).send();
  } catch (err) {
    if (err instanceof Error) {
      errorLogger(err, false, req);
    }
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
  } catch (err) {
    if (err instanceof Error) {
      errorLogger(err, false, req);
    }
    res.sendStatus(400);
  }
}

// PUT roommates/:id/role
async function putRole(req: Request, res: Response) {
  const id = req.params.id;
  const { role } = req.body as { role?: RoommateRole };
  if (typeof role === "undefined") {
    res.status(400).send("Body must include role property");
  } else {
    try {
      const updated = await RoommateService.changeRole(id, role);
      res.status(201).json(updated);
    } catch (err) {
      if (err instanceof Error) {
        errorLogger(err, false, req);
      }
      res.sendStatus(400);
    }
  }
}

export default {
  getById,
  getAllByHome,
  createOne,
  deleteOne,
  getTasks,
  putRole,
};
