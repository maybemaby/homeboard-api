import { Request, Response } from "express";
import { IMessage } from "../models/Message";
import MessageService from "../services/MessageService";


// api/v1/homes/:homeId/messages
async function postMessage(req: Request, res: Response) {
  const data = req.body as IMessage;
  data.homeId = req.params.homeId;
  const message = await MessageService.createOne(data);
  if (message) {
    res.status(201).json(message).send();
  } else {
    res.status(400).send("Couldn't send message");
  }
}

// api/v1/messages/:sender
async function getMessagesBySender(req: Request, res: Response) {
  const id = req.params.sender;
  if (!id) {
    res.sendStatus(404);
  } else {
    const messages = await MessageService.getAllBySenderId(id);
    res.status(200).json(messages).send();
  }
}

// api/v1/homes/:homeId/messages
async function getMessagesByHome(req: Request, res: Response) {
  const homeId = req.params.homeId;
  const start = req.query.start ? String(req.query.start) : req.query.start;
  const size = parseInt(String(req.query.size));
  if (!homeId) {
    res.sendStatus(404);
  } else if (size > 100) {
    res.status(400).send("Size cannot exceed 100");
  } else {
    const messages = await MessageService.getAllByHomeId(homeId, start, size);
    res.status(200).json(messages).send();
  }
}

export default {
  postMessage,
  getMessagesBySender,
  getMessagesByHome,
};
