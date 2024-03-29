import { Request, Response } from "express";
import { IHome } from "../models/Home";
import HomeService from "../services/HomeService";
import { errorLogger } from "../middleware/logging";

async function getHomes(_req: Request, res: Response) {
  const homes = await HomeService.getAll();
  res.status(200).json(homes).send();
}

async function getHomeById(req: Request, res: Response) {
  const id = req.params.homeId;
  const home = await HomeService.getById(id);
  if (!home) {
    res.status(400).send("Home not found");
  } else {
    res.status(200).json(home).send();
  }
}

async function postHome(req: Request, res: Response) {
  const data = req.body as IHome;
  try {
    const home = await HomeService.createOne(data);
    res.status(201).json(home).send();
  } catch (err) {
    if (err instanceof Error) {
      errorLogger(err, false, req);
    }
    res.status(400).send();
  }
}

// PUT /homes/:homeId
async function putHome(req: Request, res: Response) {
  const data = req.body as IHome;
  const id = req.params.homeId;
  try {
    const updated = await HomeService.editOne(id, data);
    res.status(201).json(updated);
  } catch (err) {
    if (err instanceof Error) {
      errorLogger(err, false, req);
    }
    res.sendStatus(400);
  }
}

export default {
  getHomes,
  getHomeById,
  postHome,
  putHome,
};
