import { Request, RequestHandler, Response } from "express";

type AsyncHandler = (
  req: Request,
  res: Response,
  next: RequestHandler
) => Promise<void>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ErrorHandler = (err: any) => void;

function asyncWrapper(callback: AsyncHandler) {
  return function (req: Request, res: Response, next: ErrorHandler) {
    callback(req, res, next).catch(next);
  };
}

export default asyncWrapper;
