import { Request, Response, Handler } from "express";
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

function postUser(req: Request, res: Response, next: Handler) {
  res.json(req.user);
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

// POST /auth/login
async function login(req: Request, res: Response) {
  const data = req.body as { username: string; password: string };
  if (!data.username || !data.password) {
    res.sendStatus(400);
  }
  const user = await UserService.login(data.username, data.password);
  if (user) {
    res.status(202).json(user);
  } else {
    res.status(401);
  }
}

export default {
  getUser,
  postUser,
  deleteUser,
  login,
};
