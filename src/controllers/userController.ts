import { Request, Response } from "express";
import { IUser } from "../models/User";
import UserService from "../services/UserService";

async function getUser(req: Request, res: Response) {
  const id = req.params.id;
  const user = await UserService.getById(id);
  if (!user) {
    res.status(400).send("User not found");
  } else {
    res.status(200).json(user).send();
  }
}

async function postUser(req: Request, res: Response) {
  const data = req.body as IUser;
  try {
    const user = await UserService.createOne(data);
    res.status(201).json(user).send();
  } catch {
    res.status(400).send("Error occurred creating user");
  }
}

async function deleteUser(req: Request, res: Response) {
  const id = req.params.id;
  try {
    await UserService.deleteOne(id);
    res.status(202).send();
  } catch {
    res.status(400).send("Failed to delete user");
  }
}

export default {
  getUser,
  postUser,
  deleteUser,
};
