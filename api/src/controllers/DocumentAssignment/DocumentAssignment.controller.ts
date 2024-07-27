import evalidate from "evalidate";
import { Request, Response } from "express";
import { Messages } from "../../errors/Messages";
import { Error, BadRequestError, NotFoundError } from "../../errors/Errors";
import DocumentAssignmentService from "../../services/DocumentAssignment/DocumentAssignment.service";
import config from "config";
import { BuildType } from "../../constants/constants";
import { toNumber } from "lodash";
import fs from "fs";
import logger from "../../utilities/loggers/winston";

class DocumentAssignmentController {
  /**
   * Create DocumentAssignment
   *
   * @param {Request} request
   * @param {Response} response
   */

  static create(request: Request, response: Response) {
    const Schema = new evalidate.schema({

    });

    const data = request.body;
    let user: any = request.user;
    data.url = request.file?.path;
    data.size = request.file?.size;
    data.name = request.file?.originalname;
    data.format = request.file?.originalname.split('.').pop()?.toLowerCase();
    data.project_id = toNumber(data.project_id);
    data.author = toNumber(data.author);
    data.user_id = user.id;
    const result = Schema.validate(data);
    if (result.isValid) {
      DocumentAssignmentService.create(data)
        .then(() => response.status(200).json(true))
        .catch((error) => {
          if (request.file) fs.unlinkSync(request.file.path);
          logger.error(`create error: ${JSON.stringify(error.payload)}`);
          response.status(error.statusCode).json(error.payload);
        });
    } else {
      if (request.file) fs.unlinkSync(request.file.path);
      let error = new BadRequestError(result.errors);
      response.status(error.statusCode).json(error.payload);
    }
  }

  /**
   * Find All DocumentAssignment
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

    DocumentAssignmentService.findAll(query)
      .then((result) => {
        response.json(result);
      })
      .catch((error: Error) => {
        console.log('controller lllllllllll', error);
        response.status(error.statusCode).json(error.payload);
      });
  }

  /**
   * Find DocumentAssignment By ID
   *
   * @param {Request} request
   * @param {Response} response
   */
  static findByID(request: Request, response: Response) {
    DocumentAssignmentService.findByID(request.params.id)
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
   * update DocumentAssignment
   *
   * @param {Request} request
   * @param {Response} response
   */
  static update(request: Request, response: Response) {
    const Schema = new evalidate.schema({
      id: evalidate.string().required(),
    });

    const data = request.body;
    let user: any = request.user;
    if (request.file) {
      data.url = request.file?.path;
      data.size = request.file?.size;
      data.name = request.file?.originalname;
      data.format = request.file?.originalname.split('.').pop()?.toLowerCase();
      data.project_id = toNumber(data.project_id);
      data.author = toNumber(data.author);
      data.user_id = user.id;
    }
    const result = Schema.validate(data);

    if (result.isValid) {
      DocumentAssignmentService.update(parseInt(data.id), data)
        .then(() => response.status(200).json(true))
        .catch((error) => {
          console.log(error);
          response.status(error.statusCode).json(error.payload);
        });
    } else {
      if (request.file) fs.unlinkSync(request.file.path); // Delete file on validation error
      let error = new BadRequestError(result.errors);
      response.status(error.statusCode).json(error.payload);
    }
  }

  /**
   * Delete DocumentAssignment
   *
   * @param {Request} request
   * @param {Response} response
   */
  static delete(request: Request, response: Response) {
    let id = request.params.id;
    DocumentAssignmentService.delete(id)
      .then(() => response.status(200).json(true))
      .catch((error) => response.status(error.statusCode).json(error.payload));
  }
}

export default DocumentAssignmentController;
