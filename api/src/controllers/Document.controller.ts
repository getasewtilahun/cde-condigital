import evalidate from "evalidate";
import { Request, Response } from "express";
import { Messages } from "../errors/Messages";
import { Error, BadRequestError, NotFoundError } from "../errors/Errors";
import DocumentService from "../services/Document.service";
import { Document } from "../models/Document";
import fs from "fs";
import { BuildType } from "../constants/constants";
import config from "config";
import { toNumber } from "lodash";
import logger from "../utilities/loggers/winston";

class DocumentController {
  /**
   * Create Document
   *
   * @param {Request} request
   * @param {Response} response
   */

  static create(request: Request, response: Response) {

    console.log('1111111111111111111111111111111111111111');
    let user: any = request.user;
    const Schema = new evalidate.schema({
      name: evalidate.string().required(),
      type: evalidate.string().required(),
    });
    const data = request.body;
    const result = Schema.validate(data);
    data.user_id = user.id;
    data.url = request.file?.path;
    data.size = request.file?.size;
    if (result.isValid) {
      DocumentService.create(data)
        .then(() => response.status(200).json(true))
        .catch((error) => {
          logger.error(`create error: ${JSON.stringify(error.payload)}`);
          if (request.file) fs.unlinkSync(request.file.path);
          response.status(error.statusCode).json(error.payload);
        });
    } else {
      if (request.file) fs.unlinkSync(request.file.path);
      console.log({ result });
      let error = new BadRequestError(result.errors);
      response.status(error.statusCode).json(error.payload);
    }
  }

  /**
   * Find All Document
   *
   * @param {Request} request
   * @param {Response} response
   */
  static findAll(request: Request, response: Response) {
    let user: any = request.user;
    // let query: any =
    //   config.get("app.build_type") == BuildType.PROJECT
    //     ? { user_id: user.id, is_private: false }
    //     : { is_private: false };

    let query = { user_id: user.id };

    DocumentService.findAll(query)
      .then((result: Document[]) => {
        response.json(result);
      })
      .catch((error: Error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }

  /**
   * Find Document By ID
   *
   * @param {Request} request
   * @param {Response} response
   */
  static download(request: Request, response: Response) {
    DocumentService.findByID(request.params.id)
      .then((result: Document) => {
        if (result) {
          let index = result.url.split(".").length;
          let extension = result.url.split(".")[index - 1];
          response.header("content-disposition", `extension=${extension}`);
          response.download(result.url); // Set disposition and send it.
        } else {
          let error: Error = new NotFoundError(Messages.DOCUMENT_NOT_FOUND);
          response.status(error.statusCode).json(error.payload);
        }
      })
      .catch((error: Error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }

  /**
   * Find Document By ID
   *
   * @param {Request} request
   * @param {Response} response
   */
  static findByID(request: Request, response: Response) {
    DocumentService.findByID(request.params.id)
      .then((result: Document) => {
        if (result) {
          response.json(result);
        } else {
          let error: Error = new NotFoundError(Messages.DOCUMENT_NOT_FOUND);
          response.status(error.statusCode).json(error.payload);
        }
      })
      .catch((error: Error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }

  /**
   * Update Document By ID
   *
   * @param {Request} request
   * @param {Response} response
   */
  static update(request: Request, response: Response) {
    const data: Document = request.body;

    const Schema = new evalidate.schema({
      is_private: evalidate.boolean(),
    });

    const result = Schema.validate(data);

    if (result.isValid) {
      DocumentService.update(toNumber(request.params.id), data)
        .then((result) => response.send(result))
        .catch((error: Error) => {
          response.status(error.statusCode).json(error.payload);
        });
    } else {
      let error = new BadRequestError(result.errors);
      response.status(error.statusCode).json(error.payload);
    }
  }

  /**
   * Remove Document By ID
   *
   * @param {Request} request
   * @param {Response} response
   */
  static delete(request: Request, response: Response) {
    DocumentService.delete(request.params.id)
      .then((result) => response.send(result))
      .catch((error: Error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }
}

export default DocumentController;
