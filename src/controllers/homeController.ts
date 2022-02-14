import e, { Request, Response } from "express";
import { IUser } from "../models/User";
import { IRoommate } from "../models/Roommate";
import { IHome } from "../models/Home";
import { generateUID } from "../models/Base";
import { IMessage } from "../models/Message";

const user: IUser = {
  username: "maby",
  firstName: "Brandon",
  lastName: "Ma",
  homes: [],
  id: generateUID(),
  metadata: {
    lastLogin: new Date(),
    signUpDate: new Date(),
  },
};

const roommate: IRoommate = {
  user: user,
  id: generateUID(),
  role: "Manager",
};

const homes: IHome[] = [
  {
    id: generateUID(),
    createdAt: new Date(),
    name: "Test Home",
    roommates: [roommate],
  },
];

const messages: IMessage[] = [
  {
    id: generateUID(),
    content: "Grabbing groceries, need anything?",
    homeId: homes[0].id,
    senderId: roommate.id,
    sentAt: new Date(),
  },
];

console.log(homes);

function getHomes(_req: Request, res: Response) {
  res.status(200).json(homes).send();
}

function getHomeById(req: Request, res: Response) {
  const id = req.params.homeId;
  const home = homes.find((h) => {
    return h.id === id;
  });
  console.log(id, home);
  if (typeof home == "undefined") {
    res.status(400).send("Home not found");
  } else {
    res.status(200).json(home).send();
  }
}

function postHome(req: Request, res: Response) {
  const data = req.body as IHome;
  if (data) {
    data.id = generateUID();
    data.createdAt = new Date(data.createdAt);
    homes.push(data);
    res.status(200).json({ createdUrl: `/api/v1/homes/${data.id}` });
  } else {
    res.status(400).send();
  }
}

function getMessages(req: Request, res: Response) {
  const homeId = req.params.homeId;
  const resMessages = messages.filter((message) => (message.homeId = homeId));
  res.status(200).json(resMessages).send();
}

function postMessage(req: Request, res: Response) {
  const data = req.body as IMessage;
  if (data) {
    data.id = generateUID();
    data.sentAt = new Date();
    messages.push(data);
    res.status(200).json(data).send();
  } else {
    res.status(400).send();
  }
}

export default {
  getHomes,
  getHomeById,
  postHome,
  getMessages,
  postMessage,
};
