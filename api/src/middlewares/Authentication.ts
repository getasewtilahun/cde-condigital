import config from "config";
import passport from "passport";
import jsonwebtoken from "jsonwebtoken";
import { ErrorCodes } from "../errors/Messages";
import passportConfig from "../utilities/passport/passport";
import { NextFunction, Request, Response } from "express";
import { Logger } from "./Logger";
import { UserDAL } from "../dals/User";
import { UnauthorizedError } from "../errors/Errors";
/**
 *
 * @param {Request} request
 * @param {Response} response
 * @param {Function} next
 */
let authentication = (request: Request, response: Response, next: Function) => {
  if (!request.body.email) {
    return response.status(400).json({
      message: "Email required!",
    });
  }
  if (!request.body.password) {
    return response.status(400).json({
      message: "Password required!",
    });
  }

  passport.authenticate("local", { session: false }, (error, user, info) => {
    console.log(
      "🚀 ~ file: Authentication.ts:27 ~ passport.authenticate ~ user",
      user
    );
    if (error) {
      return response.status(500).send(error);
    } else if (!user) {
      return response
        .status(401)
        .json({ message: "Login Failed: Invalid Username or password!" });
    } else {
      request.logIn(user, { session: false }, (error) => {
        if (error) {
          return response
            .status(401)
            .json({ message: "Login Failed: Invalid Username or password!" });
        }
        next();
      });
    }
  })(request, response, next);
};

let generateAccessToken = (request: any, response: any, next: Function) => {
  let user: any = request.user;

  request.token = jsonwebtoken.sign(
    {
      id: user.id,
      name: user.full_name,
      email: user.email,
      is_super_user: user.is_super_user,
      user_role: user.user_role?.name ?? null,
    },
    passportConfig.security.secret
  );
  console.log("token generated", request.token);
  next();
};

let response = (request: any, response: any) => {
  let user = request.user;
  console.log("gen response");
  UserDAL.findOne({ id: user.id }).then((user) => {
    console.log("user", user);
    const data = {
      user_role: user?.user_role,
      token: request.token,
      name: user?.full_name,
      email: user?.email,
      id: user?.id,
      is_super_user: user?.is_super_user,
    };
    response.status(200).json(data);
  });
};

let getUserHeader = (request: Request, response: Response, next: Function) => {
  const authentication_header = request.headers.authorization;
  const token = authentication_header && authentication_header.split(" ")[1];
  if (token == null) return response.sendStatus(ErrorCodes.UNAUTHORIZED_ERROR);

  jsonwebtoken.verify(
    token,
    passportConfig.security.secret,
    (error: any, user: any) => {
      request.user = user;
      next();
    }
  );
};

let authenticateHeader = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authentication_header = request.headers.authorization;
  const token = authentication_header && authentication_header.split(" ")[1];
  if (token == null) return response.sendStatus(ErrorCodes.UNAUTHORIZED_ERROR);

  jsonwebtoken.verify(
    token,
    passportConfig.security.secret,
    (error: any, user: any) => {
      if (error) {
        return response.sendStatus(ErrorCodes.FORBIDDEN_ERROR);
      }
      request.user = user;

      Logger(request, response, next);
    }
  );
};

let authenticateRole = (
  request: Request,
  response: Response,
  next: Function
) => {
  const user: any = request.user;
  UserDAL.findOne({ id: user.id })
    .then((result) => {
      if (result && result.status === "Activated") {
        next();
      } else {
        let error = new UnauthorizedError();
        return response.status(error.statusCode).json(error.payload);
      }
    })
    .catch((errors) => {
      let error = new UnauthorizedError();
      return response.status(error.statusCode).json(error.payload);
    });
};

export default {
  authentication,
  generateAccessToken,
  response,
  authenticateHeader,
  authenticateRole,
  getUserHeader,
};
