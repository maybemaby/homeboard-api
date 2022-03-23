import { Request, Response, NextFunction, Handler } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { IUser } from "../models/User";
import UserService from "../services/UserService";
import { JWT_SECRET } from "../index";

async function getUser(req: Request, res: Response) {
  const id = req.params.id;
  const user = await UserService.getById(id);
  if (!user) {
    res.status(400).send("User not found");
  } else {
    const { password, ...body } = user;
    res.status(200).json(body);
  }
}

function postUser(req: Request, res: Response, next: NextFunction) {
  (
    passport.authenticate(
      "signup",
      { session: false },
      (err, user, info: { message: string }) => {
        if (err) {
          if (info) {
            res.status(400).send(info.message);
          } else {
            res.status(400).send("Could not create account");
          }
        } else if (user) {
          res.status(201).json(user);
        }
      }
    ) as Handler
  )(req, res, next);
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
function login(req: Request, res: Response, next: NextFunction) {
  (
    passport.authenticate(
      "login",
      (err, user: Omit<IUser, "password">, info) => {
        try {
          if (err || !user) {
            const error = new Error("Could not login");
            return next(error);
          }

          req.login(user, { session: false }, (err) => {
            if (err) return next(err);
            const body = { ...user };
            const token = jwt.sign({ user: body }, JWT_SECRET, {
              expiresIn: "7d",
              issuer: "https://homeboard.com",
            });
            return res.json({ token });
          });
        } catch (err) {
          return next(err);
        }
      }
    ) as Handler
  )(req, res, next);
}

export default {
  getUser,
  postUser,
  deleteUser,
  login,
};
