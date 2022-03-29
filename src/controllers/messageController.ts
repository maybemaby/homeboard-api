import { Request, Response, NextFunction } from "express";
import { IMessage } from "../models/Message";
import MessageService from "../services/MessageService";
import { errorLogger } from "../middleware/logging";

// api/v1/homes/:homeId/messages
async function postMessage(req: Request, res: Response) {
  const data = req.body as IMessage;
  data.homeId = req.params.homeId;
  try {
    if (data.senderId === data.receiverId) {
      res.status(400).send("Cannot send message to self");
      return;
    }
    const message = await MessageService.createOne(data);
    if (message) {
      res.status(201).json(message).send();
    } else {
      res.status(400).send("Couldn't send message");
    }
  } catch (err) {
    if (err instanceof Error) {
      errorLogger(err, false, req);
    }
    res.sendStatus(400);
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

// GET api/v1/homes/:homeID/messages/:messageId/replies
async function getMessageReplies(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const messageId = req.params.messageId;
  try {
    const replies = await MessageService.getRepliesTo(messageId);
    res.status(200).json(replies);
  } catch {
    res.sendStatus(400);
  }
}

// POST api/v1/homes/:homeID/messages/:messageId/replies
async function postMessageReplies(
  req: Request,
  res: Response,
  _next: NextFunction
) {
  const messageId = req.params.messageId;
  const data = req.body as IMessage;
  try {
    const message = await MessageService.replyTo(messageId, data);
    res.status(201).json(message);
  } catch (err) {
    if (err instanceof Error) {
      errorLogger(err, false, req);
    }
    res.sendStatus(400);
  }
}

export default {
  postMessage,
  getMessagesBySender,
  postMessageReplies,
  getMessagesByHome,
  getMessageReplies,
};
