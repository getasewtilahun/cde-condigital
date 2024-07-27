import evalidate from "evalidate";
import { Request, Response } from "express";
import { Messages } from "../../errors/Messages";
import { Error, BadRequestError, NotFoundError } from "../../errors/Errors";
import UserLogService from "../../services/User/UserLog.service";
import UserService from "../../services/User/User.service";
import moment from "moment";
import { Op } from "sequelize";
import { getPagination } from "../../utilities/Pagination/Pagination";

class UserLogController {
  static create(request: Request, response: Response) {
    const Schema = new evalidate.schema({});

    const data = request.body;
    const user: any = request.user;
    data.user_id = user.id;
    const result = Schema.validate(data);
    if (result.isValid) {
      UserLogService.create(data)
        .then(() => response.status(200).json(true))
        .catch((error) => {
          response.status(error.statusCode).json(error.payload);
        });
    } else {
      let error = new BadRequestError(result.errors);
      response.status(error.statusCode).json(error.payload);
    }
  }

  static findAll(request: Request, response: Response) {
    const user: any = request.user;

    UserLogService.findAll({})
      .then((result) => {
        response.json(result);
      })
      .catch((error: Error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }

  static findByID(request: Request, response: Response) {
    UserLogService.findByID(request.params.id)
      .then((result) => {
        if (result) {
          response.json(result);
        } else {
          let error: Error = new NotFoundError("User Not Found");
          response.status(error.statusCode).json(error.payload);
        }
      })
      .catch((error: Error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }

  static findPaged(request: Request, response: Response) {
    const user: any = request.user;
    let query = request.query;
    let user_query = {};
    let { limit, offset } = getPagination(request.query);
    delete query["limit"];
    delete query["offset"];

    let search: any = request.query?.search;
    let searched: any = {};
    if (search) {
      let splitted = search.split("---");
      searched = { [splitted[0]]: { [Op.like]: `%${splitted[1]}%` } };
    }
    delete query["search"];

    if (!user.is_super_user) {
      user_query = {
        [Op.or]: {
          "$good_out_statuses.user_id$": user.id,
          user_id: user.id,
        },
      };
    }

    UserLogService.findPaged({
      limit,
      offset,
      where: {
        ...query,
        ...searched,
        ...user_query,
      },
    })
      .then((result) => {
        response.json(result);
      })
      .catch((error: Error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }

  static update(request: Request, response: Response) {
    const Schema = new evalidate.schema({
      id: evalidate.number().required(),
    });

    const data = request.body;
    const result = Schema.validate(data);
    if (result.isValid) {
      UserLogService.update(data.id, data)
        .then(() => response.status(200).json(true))
        .catch((error) => {
          response.status(error.statusCode).json(error.payload);
        });
    } else {
      let error = new BadRequestError(result.errors);
      response.status(error.statusCode).json(error.payload);
    }
  }

  static updateSeen(request: Request, response: Response) {
    const Schema = new evalidate.schema({
      id: evalidate.number().required(),
    });

    const data = request.body;

    const result = Schema.validate(data);
    if (result.isValid) {
      UserService.update(data.id, { last_seen: moment() })
        .then(() => response.status(200).json(true))
        .catch((error) => {
          response.status(error.statusCode).json(error.payload);
        });
    } else {
      let error = new BadRequestError(result.errors);
      response.status(error.statusCode).json(error.payload);
    }
  }

  static delete(request: Request, response: Response) {
    let id = request.params.id;
    UserLogService.delete(id)
      .then(() => response.status(200).json(true))
      .catch((error) => response.status(error.statusCode).json(error.payload));
  }
}

export default UserLogController;
