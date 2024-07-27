import { Request, Response, NextFunction } from "express";
import moment from "moment";

import logger from "../utilities/loggers/winston";
export const Logger = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (
    request.method === "POST" ||
    request.method === "PUT" ||
    request.method === "DELETE"
  )
    if (request.url !== "/api/user/login" && request.url !== "/api/user")
      logger.info({
        url: request.originalUrl,
        user_id: request.user,
        body: request.body,
        method: request.method,
        date: moment().format("YYYY-MM-DD"),
      });
    else
      logger.info({
        url: request.originalUrl,
        user_id: request.user,
        body: {},
        method: request.method,
        date: moment().format("YYYY-MM-DD"),
      });

  next();
};
