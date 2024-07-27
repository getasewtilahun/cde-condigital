import evalidate from "evalidate";
import { Request, Response } from "express";
import { Error, BadRequestError, NotFoundError } from "../../errors/Errors";

import { getPagination } from "../../utilities/Pagination/Pagination";
import { Op } from "sequelize";
import { UserRoleService } from "../../services/User";

class UserRoleController {
  /**
   * Create UserRole
   *
   * @param {Request} request
   * @param {Response} response
   */

  static create(request: Request, response: Response) {
    const Schema = new evalidate.schema({});
    const data = request.body;
    const user: any = request.user;
    data.user_id = user.id;
    const result = Schema.validate(data);
    if (result.isValid) {
      UserRoleService.create(data)
        .then(() => response.status(200).json(true))
        .catch((error) => {
          console.log(error);
          response.status(error.statusCode).json(error.payload);
        });
    } else {
      let error = new BadRequestError(result.errors);
      response.status(error.statusCode).json(error.payload);
    }
  }

  /**
   * Find Paged Boq
   *
   * @param {Request} request
   * @param {Response} response
   */
  static findPaged(request: Request, response: Response) {
    let query = request.query;
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

    UserRoleService.findPaged({
      limit,
      offset,
      where: { ...query, ...searched },
    })
      .then((result) => {
        response.json(result);
      })
      .catch((error: Error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }

  /**
   * Find All UserRole
   *
   * @param {Request} request
   * @param {Response} response
   */
  static findAll(request: Request, response: Response) {
    console.log(request.query);
    UserRoleService.findAll(request.query)
      .then((result) => {
        response.json(result);
      })
      .catch((error: Error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }

  /**
   * Find UserRole By ID
   *
   * @param {Request} request
   * @param {Response} response
   */
  static findByID(request: Request, response: Response) {
    UserRoleService.findByID(request.params.id)
      .then((result) => {
        if (result) {
          response.json(result);
        } else {
          let error: Error = new NotFoundError(" User Role Not Found");
          response.status(error.statusCode).json(error.payload);
        }
      })
      .catch((error: Error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }
  /**
   * update UserRole
   *
   * @param {Request} request
   * @param {Response} response
   */
  static update(request: Request, response: Response) {
    const Schema = new evalidate.schema({
      id: evalidate.number().required(),
    });

    const data = request.body;
    const result = Schema.validate(data);
    if (result.isValid) {
      UserRoleService.update(data.id, data)
        .then(() => response.status(200).json(true))
        .catch((error) => {
          console.log(error);
          response.status(error.statusCode).json(error.payload);
        });
    } else {
      let error = new BadRequestError(result.errors);
      response.status(error.statusCode).json(error.payload);
    }
  }

  /**
   * Delete UserRole
   *
   * @param {Request} request
   * @param {Response} response
   */
  static delete(request: Request, response: Response) {
    let id = request.params.id;
    UserRoleService.delete(id)
      .then(() => response.status(200).json(true))
      .catch((error) => response.status(error.statusCode).json(error.payload));
  }
}

export default UserRoleController;
