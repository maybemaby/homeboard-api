import { NextFunction, Request, Response } from "express";
import homeService from "../services/HomeService";
import { IUser } from "../models/User";

export async function canViewHome(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user as IUser;
  const homeId = req.params.homeId;
  if (await homeService.containsUser(user.id, homeId)) {
    return next();
  } else {
    res.status(403).send("You lack permissions to view this resource");
  }
}
