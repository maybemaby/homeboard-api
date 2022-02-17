import { Request, Response } from "express";
import { IRoommate } from "../models/Roommate";
import RoommateService from "../services/RoommateService";

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

export default {
  getById,
  getAllByHome,
  createOne,
  deleteOne,
};
