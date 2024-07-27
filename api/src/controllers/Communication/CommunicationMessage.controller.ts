import evalidate from "evalidate";
import { Request, Response } from "express";
import fs from "fs";
import moment from "moment";
import { BadRequestError, Error, NotFoundError } from "../../errors/Errors";
import { Messages } from "../../errors/Messages";
import { CommunicationMessage } from "../../models/Communication/CommunicationMessage";
import CommunicationMessageService from "../../services/Communication/CommunicationMessage.service";
import { getPagination } from "../../utilities/Pagination/Pagination";

class CommunicationMessageController {
  /**
   * Create CommunicationMessage
   *
   * @param {Request} request
   * @param {Response} response
   */
  static create(request: Request, response: Response) {
    const Schema = new evalidate.schema({
      communication_group_id: evalidate.number().required(),
      date: evalidate.date().required(),
      text: evalidate.string(),
    });

    const data = request.body;
    const file = request.file;
    const user: any = request.user;

    data.user_id = user.id;
    data.date = moment();
    if (file) data.document_url = file?.path;
    if (data.communication_group_id)
      data.communication_group_id = Number(data.communication_group_id);

    const result = Schema.validate(data);

    if (result.isValid) {
      CommunicationMessageService.create(data)
        .then((result) => response.status(200).json(result))
        .catch((error) => {
          if (file?.path && fs.existsSync(file?.path)) fs.unlinkSync(file?.path);

          // Ensure error status code
          if (!error.statusCode) {
            error.statusCode = 500;
          }

          response.status(error.statusCode).json(error.payload);
        });
    } else {
      if (file?.path && fs.existsSync(file?.path)) fs.unlinkSync(file?.path);

      let error = new BadRequestError(result.errors);
      response.status(error.statusCode).json(error.payload);
    }
  }


  /**
   * Find All CommunicationMessage
   *
   * @param {Request} request
   * @param {Response} response
   */
  static findAll(request: Request, response: Response) {
    let query: any = request.query;

    CommunicationMessageService.findAll(query)
      .then((result) => {
        response.status(200).json(result); // Ensure status 200
      })
      .catch((error: Error) => {
        // Ensure error status code
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        response.status(error.statusCode).json(error.payload);
      });
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

    CommunicationMessageService.findPaged({
      limit,
      offset,
      where: { ...query },
    })
      .then((result) => {
        response.status(200).json(result); // Ensure status 200
      })
      .catch((error: Error) => {
        // Ensure error status code
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        response.status(error.statusCode).json(error.payload);
      });
  }


  /**
   * Search Communication Messages
   *
   * @param {Request} request
   * @param {Response} response
   */
  static search(request: Request, response: Response) {
    let query = request.query;
    let { limit, offset } = getPagination(request.query);
    delete query["limit"];
    delete query["offset"];

    if (!query.search) query.search = "";

    if (!query.communication_group_id) query.communication_group_id = "-1";

    CommunicationMessageService.search({
      limit,
      offset,
      search: query.search,
      communication_group_id: query.communication_group_id,
    })
      .then((result) => {
        response.status(200).json(result); // Ensure status 200
      })
      .catch((error: Error) => {
        // Ensure error status code
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        response.status(error.statusCode).json(error.payload);
      });
  }


  static download(request: Request, response: Response) {
    CommunicationMessageService.findByID(request.params.id)
      .then((result: CommunicationMessage) => {
        if (result) {
          let index = result.document_url.split(".").length;
          let extension = result.document_url.split(".")[index - 1];
          response.header("content-disposition", `extension=${extension}`);
          response.status(200).download(result.document_url); // Ensure status 200
        } else {
          let error: Error = new NotFoundError(Messages.DOCUMENT_NOT_FOUND);
          response.status(error.statusCode).json(error.payload);
        }
      })
      .catch((error: Error) => {
        // Ensure error status code
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        response.status(error.statusCode).json(error.payload);
      });
  }


  /**
   * update CommunicationMessage
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
      CommunicationMessageService.update(data.id, data)
        .then(() => response.status(200).json(true))
        .catch((error) => {
          console.log(error);
          // Ensure error status code
          if (!error.statusCode) {
            error.statusCode = 500;
          }
          response.status(error.statusCode).json(error.payload);
        });
    } else {
      let error = new BadRequestError(result.errors);
      response.status(error.statusCode).json(error.payload);
    }
  }


  /**
   * Delete CommunicationMessage
   *
   * @param {Request} request
   * @param {Response} response
   */
  static delete(request: Request, response: Response) {
    let id = request.params.id;
    CommunicationMessageService.delete(id)
      .then(() => response.status(200).json(true))
      .catch((error) => {
        // Ensure error status code
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        response.status(error.statusCode).json(error.payload);
      });
  }
}

export default CommunicationMessageController;
