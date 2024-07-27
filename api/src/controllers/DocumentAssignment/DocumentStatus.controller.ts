import evalidate from "evalidate";
import { Request, Response } from "express";
import { Messages } from "../../errors/Messages";
import { Error, BadRequestError, NotFoundError } from "../../errors/Errors";
import DocumentStatusService from "../../services/DocumentAssignment/DocumentStatus.service";
import config from "config";
import { BuildType } from "../../constants/constants";
import { toNumber } from "lodash";
import fs from "fs";
import logger from "../../utilities/loggers/winston";

class DocumentStatusController {
  /**
   * Create DocumentStatus
   *
   * @param {Request} request
   * @param {Response} response
   */

  static create(request: Request, response: Response) {
    const Schema = new evalidate.schema({

    });

    const data = request.body;
    console.log('mmmmmmmmmmmmmmmmmmmmmmmmmm', data);
    let user: any = request.user;
    data.user_id = user.id;
    const result = Schema.validate(data);
    if (result.isValid) {
      DocumentStatusService.create(data)
        .then(() => response.status(200).json(true))
        .catch((error) => {
          console.log("Controller error", error);
          logger.error(`create error: ${JSON.stringify(error.payload)}`);
          response.status(error.statusCode).json(error.payload);
        });
    } else {
      console.log("Invalid request");
      let error = new BadRequestError(result.errors);
      response.status(error.statusCode).json(error.payload);
    }
  }

  /**
   * Find All DocumentStatus
   *
   * @param {Request} request
   * @param {Response} response
   */
  static findAll(request: Request, response: Response) {
    const user: any = request.user;
    let query: any = { user_id: user.id }

    if (request.query.project_id && request.query.project_id !== "undefined")
      query = { project_id: parseInt(request.query.project_id.toString()), ...query };
    if (request.query.type && request.query.type !== "undefined")
      query = { type: request.query.type, ...query };
    if (request.query.category && request.query.category !== "undefined")
      query = { category: request.query.category, ...query };
    if (request.query.folder && request.query.folder !== "undefined")
      query = { folder: request.query.folder, ...query };
    if (request.query.sub_folder && request.query.sub_folder !== "undefined")
      query = { sub_folder: request.query.sub_folder, ...query };

    DocumentStatusService.findAll(query)
      .then((result) => {
        response.json(result);
      })
      .catch((error: Error) => {
        console.log('controller lllllllllll', error);
        response.status(error.statusCode).json(error.payload);
      });
  }

  /**
   * Find DocumentStatus By ID
   *
   * @param {Request} request
   * @param {Response} response
   */
  static findByID(request: Request, response: Response) {
    DocumentStatusService.findByID(request.params.id)
      .then((result) => {
        if (result) {
          response.json(result);
        } else {
          let error: Error = new NotFoundError("Document not found");
          response.status(error.statusCode).json(error.payload);
        }
      })
      .catch((error: Error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }
  /**
   * update DocumentStatus
   *
   * @param {Request} request
   * @param {Response} response
   */
  static update(request: Request, response: Response) {
    const Schema = new evalidate.schema({
      id: evalidate.string().required(),
    });

    const data = request.body;
    console.log("requested data 11111111", request.body);
    const result = Schema.validate(data);
    if (result.isValid) {
      DocumentStatusService.update(parseInt(data.id), data)
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
   * Delete DocumentStatus
   *
   * @param {Request} request
   * @param {Response} response
   */
  static delete(request: Request, response: Response) {
    let id = request.params.id;
    DocumentStatusService.delete(id)
      .then(() => response.status(200).json(true))
      .catch((error) => response.status(error.statusCode).json(error.payload));
  }
}

export default DocumentStatusController;
