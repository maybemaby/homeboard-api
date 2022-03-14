import { Request, Response } from "express";
import { ITask } from "../models/Task";
import TaskService from "../services/TaskService";

interface PutAssigneesBody {
  connect?: {
    roommate: {
      connect: {
        id: string;
      };
    };
  }[];
  disconnect?: {
    roommateId: string;
  }[];
}

// GET tasks/:taskId
async function getTask(req: Request, res: Response) {
  const id = req.params.taskId;
  try {
    const task = await TaskService.getOne(id);
    res.status(200).json(task);
  } catch {
    res.sendStatus(400);
  }
}

// PUT tasks/:taskId/complete
async function completeTask(req: Request, res: Response) {
  const id = req.params.taskId;
  const { completedBy } = req.body as { completedBy?: string };
  if (completedBy) {
    try {
      const taskRes = await TaskService.completeOne(id, completedBy);
      res.status(201).json(taskRes);
    } catch {
      res.sendStatus(400);
    }
  } else {
    res.status(400).send("Needs completedBy in body");
  }
}

// POST /tasks
async function createTask(req: Request, res: Response) {
  const data = req.body as ITask;
  try {
    const task = await TaskService.createOne(data);
    res.status(200).json(task);
  } catch (err) {
    res.sendStatus(400);
  }
}

// PUT /tasks/:taskId/assignees
async function putAssignees(req: Request, res: Response) {
  const id = req.params.taskId;
  const data = req.body as PutAssigneesBody;
  try {
    const updated = await TaskService.changeAssignees(
      id,
      data.connect,
      data.disconnect
    );
    res.status(201).json(updated);
  } catch (err) {
    if (err instanceof Error) {
      if (err.message.includes("Unique constraint failed")) {
        res.status(400).send("Task already assigned to one of the roommates");
      }
    }

    res.sendStatus(400);
  }
}

export default {
  getTask,
  createTask,
  completeTask,
  putAssignees,
};
