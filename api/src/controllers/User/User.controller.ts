import evalidate from "evalidate";
import { Request, Response } from "express";
import { Messages } from "../../errors/Messages";
import { Error, BadRequestError, NotFoundError } from "../../errors/Errors";
import UserService from "../../services/User/User.service";
import { User } from "../../models/User/User.model";
import { UserStatus } from "../../constants/constants";
class UserController {
  /**
   * Create User
   *
   * @param {Request} request
   * @param {Response} response
   */
  static create(request: Request, response: Response) {
    const Schema = new evalidate.schema({
      full_name: evalidate.string().required(),
      password: evalidate.string().required(),
      email: evalidate.string().email().required(),
    });

    const data = request.body;
    const result = Schema.validate(data);
    console.log("user data", result);
    if (result.isValid) {
      UserService.createEnterpriseUser(data)
        .then((result: User) => {
          response.status(200).json(result);
        })
        .catch((error: Error) => {
          console.log({ error });
          response.status(error.statusCode).json(error.payload);
        });
    } else {
      let error = new BadRequestError(result.errors);
      response.status(error.statusCode).json(error.payload);
    }
  }

  /**
   * Create self attending User
   *
   * @param {Request} request
   * @param {Response} response
   */
  static createSelfAttendingUser(request: Request, response: Response) {
    const Schema = new evalidate.schema({
      user_id: evalidate.number().required(),
    });

    const data = request.body;
    const result = Schema.validate(data);

    if (result.isValid) {
      UserService.createEnterpriseUser(data)
        .then((result: User) => {
          response.status(200).json(result);
        })
        .catch((error: Error) => {
          console.log({ error });
          response.status(error.statusCode).json(error.payload);
        });
    } else {
      let error = new BadRequestError(result.errors);
      response.status(error.statusCode).json(error.payload);
    }
  }

  /**
   * Find All User
   *
   * @param {Request} request
   * @param {Response} response
   */
  static findAll(request: Request, response: Response) {
    let query: any = { status: [UserStatus.ACTIVATED, UserStatus.PENDING], ...request.query };
    if (query.filter) {
      delete query["filter"];
      delete query["status"];
    }
    UserService.findAll(query)
      .then((result: User[]) => {
        response.json(result);
      })
      .catch((error: Error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }

  /**
   * Find All User
   *
   * @param {Request} request
   * @param {Response} response
   */
  static findByFeature(request: Request, response: Response) {
    let query: any = { status: UserStatus.ACTIVATED };

    UserService.findByFeature({
      feature: request.query?.feature,
    })
      .then((result: User[]) => {
        response.json(result);
      })
      .catch((error: Error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }

  /**
   * Find User By ID
   *
   * @param {Request} request
   * @param {Response} response
   */
  static findByID(request: Request, response: Response) {
    UserService.findByID(request.params.id)
      .then((result: User) => {
        if (result) {
          response.json(result);
        } else {
          let error: Error = new NotFoundError(Messages.USER_NOT_FOUND);
          response.status(error.statusCode).json(error.payload);
        }
      })
      .catch((error: Error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }

  /**
   * Find User By ID
   *
   * @param {Request} request
   * @param {Response} response
   */
  static isValid(request: Request, response: Response) {
    let query = {};
    if (request.query.user_name && request.query.user_name !== "undefined")
      query = { ...query, user_name: request.query.user_name };
    if (request.query.email && request.query.email !== "undefined")
      query = { ...query, email: request.query.email };

    UserService.isValid(query)
      .then((result: any) => {
        response.json(true);
      })
      .catch((error: Error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }

  /**
   * Update user password
   * @param {Request} request
   * @param {Response} response
   */
  static updateUserPassword(request: Request, response: Response) {
    const Schema = new evalidate.schema({
      old_password: evalidate.string().required(),
      new_password: evalidate.string().required(),
    });

    const data = request.body;
    const user: any = request.user;
    data.user_id = user.id;
    const result = Schema.validate(data);
    if (result.isValid) {
      UserService.updatePassword(data)
        .then((result: User) => {
          response.status(200).json(result);
        })
        .catch((error: Error) => {
          response.status(error.statusCode).json(error.payload);
        });
    } else {
      let error = new BadRequestError(result.errors);
      response.status(error.statusCode).json(error.payload);
    }
  }

  /**
  * Update user password
  * @param {Request} request
  * @param {Response} response
  */
  static resetPassword(request: Request, response: Response) {
    const Schema = new evalidate.schema({
      user_id: evalidate.number().required()
    });

    const data = request.body;
    const result = Schema.validate(data);
    if (result.isValid) {
      UserService.resetPassword(data)
        .then((result: User) => {
          response.status(200).json(result);
        })
        .catch((error: Error) => {
          response.status(error.statusCode).json(error.payload);
        });
    } else {
      let error = new BadRequestError(result.errors);
      response.status(error.statusCode).json(error.payload);
    }
  }

  /**
   *
   * @param request
   * @param response
   */
  static updateUserOnly(request: Request, response: Response) {
    const Schema = new evalidate.schema({
      id: evalidate.number().required(),
    });

    const data = request.body;
    const result = Schema.validate(data);
    if (result.isValid) {
      UserService.updateUserOnly(data)
        .then((res) => {
          response
            .status(200)
            .json({ message: "User updated", status: true, data: res });
        })
        .catch((err) => response.status(err.statuscode).json(err.payload));
    } else {
      let error = new BadRequestError(result.errors);
      response.status(error.statusCode).json(error.payload);
    }
  }
}

export default UserController;
