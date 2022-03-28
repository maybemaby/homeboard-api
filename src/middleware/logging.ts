import config from "../config";
import { Request, Response, NextFunction } from "express";
import { IUser } from "../models/User";

interface FuncDetails<T extends (...args: any) => any> {
  name: string;
  arguments: Parameters<T>;
}

export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, firstName, lastName, ...user } = req.user as IUser;
  config.loggers.requests.info(`${req.method} ${req.baseUrl}`, {
    user: user,
    params: req.params,
    query: req.query,
    agent: req.header("User-Agent"),
  });
  next();
};

export const authLogger = (req: Request, res: Response, next: NextFunction) => {
  const logTemplate = {
    message: `${req.method} ${req.path} ${req.ip}`,
    meta: {
      endpoint: req.path,
      protocol: req.protocol,
    },
  };
  if (req.protocol === "http") {
    config.loggers.requests.warn(logTemplate);
  } else {
    config.loggers.requests.info(logTemplate);
  }
  next();
};

export const errorLogger = (
  err: Error,
  includeStack: boolean,
  req?: Request,
  funcInfo?: FuncDetails<any>
) => {
  let meta: Record<string, any> = {
    func: funcInfo,
    errName: err.name,
    errMessage: err.message,
    stacktrace: includeStack ? err.stack : undefined,
  };

  if (req) {
    const { email, firstName, lastName, ...user } = req.user as IUser;
    meta = { user: user, params: req.params, query: req.query, ...meta };
    config.loggers.errors.error(`${req.method} ${req.baseUrl}`, meta);
    return;
  }

  config.loggers.errors.error(`${err.name}: ${err.message}`, meta);
};
