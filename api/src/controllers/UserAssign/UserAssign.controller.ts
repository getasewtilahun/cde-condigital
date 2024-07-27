import evalidate from "evalidate";
import { Request, Response } from "express";
import { Error, BadRequestError, NotFoundError } from "../../errors/Errors";
import { getPagination } from "../../utilities/Pagination/Pagination";
import { Op } from "sequelize";
import { UserAssignService } from "../../services/UserAssign";

class UserAssignController {
  /**
   * Create UserAssign
   *
   * @param {Request} request
   * @param {Response} response
   */

  static create(request: Request, response: Response) {

    const data = request.body;
    const user: any = request.user;
    let updatedData = data.map((item: any) => {
      return {
        ...item,
        user_id: user.id
      };
    });
    // if (result.isValid) {
    UserAssignService.create(updatedData)
      .then(() => response.status(200).json(true))
      .catch((error) => {
        console.log("controler", error);
        response.status(error.statusCode).json(error.payload);
      });
    // } else {
    //   let error = new BadRequestError(result.errors);
    //   response.status(error.statusCode).json(error.payload);
    // }
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

    UserAssignService.findPaged({
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
   * Find All UserAssign
   *
   * @param {Request} request
   * @param {Response} response
   */
  static findAll(request: Request, response: Response) {
    console.log("query", request.query)
    let query: any = {}
    if (request.query.project_id) query = { ...query, project_id: parseInt(request.query.project_id.toString()) }
    UserAssignService.findAll(query)
      .then((result) => {
        response.json(result);
      })
      .catch((error: Error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }

  /**
   * Find UserAssign By ID
   *
   * @param {Request} request
   * @param {Response} response
   */
  static findByID(request: Request, response: Response) {
    UserAssignService.findByID(request.params.id)
      .then((result) => {
        if (result) {
          response.json(result);
        } else {
          let error: Error = new NotFoundError(" UserAssign Not Found");
          response.status(error.statusCode).json(error.payload);
        }
      })
      .catch((error: Error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }
  /**
   * update UserAssign
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
      UserAssignService.update(data.id, data)
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
   * Delete UserAssign
   *
   * @param {Request} request
   * @param {Response} response
   */
  static delete(request: Request, response: Response) {
    let id = request.params.id;
    UserAssignService.delete(id)
      .then(() => response.status(200).json(true))
      .catch((error) => response.status(error.statusCode).json(error.payload));
  }
}

export default UserAssignController;
