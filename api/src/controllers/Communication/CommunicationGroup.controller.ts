import evalidate from "evalidate";
import { Request, Response } from "express";
import { BadRequestError, Error } from "../../errors/Errors";
import CommunicationGroupService from "../../services/Communication/CommunicationGroup.service";

class CommunicationGroupController {
  /**
   * Create CommunicationGroup
   *
   * @param {Request} request
   * @param {Response} response
   */
  static create(request: Request, response: Response) {
    const Schema = new evalidate.schema({
      name: evalidate.string().required(),
    });

    const data = request.body;
    const user: any = request.user;
    data.user_id = user.id;
    const result = Schema.validate(data);

    if (result.isValid) {
      CommunicationGroupService.create(data)
        .then((result) => response.status(200).json(result))
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
   * Find All CommunicationGroup
   *
   * @param {Request} request
   * @param {Response} response
   */
  static findAll(request: Request, response: Response) {
    const user: any = request.user;

    CommunicationGroupService.findAll(user)
      .then((result) => {
        response.json(result);
      })
      .catch((error: Error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }

  /**
   * Find All CommunicationGroup
   *
   * @param {Request} request
   * @param {Response} response
   */
  static findAllUsers(request: Request, response: Response) {
    const query: any = request.query;

    CommunicationGroupService.findAllUsers(query)
      .then((result) => {
        response.json(result);
      })
      .catch((error: Error) => {
        response.status(error.statusCode).json(error.payload);
      });
  }

  /**
   * update CommunicationGroup
   *
   * @param {Request} request
   * @param {Response} response
   */
  static update(request: Request, response: Response) {
    const Schema = new evalidate.schema({
      id: evalidate.number().required(),
      name: evalidate.string(),
    });

    const data = request.body;
    const result = Schema.validate(data);
    if (result.isValid) {
      CommunicationGroupService.update(data.id, data)
        .then((result) => response.status(200).json(result))
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
   * update CommunicationGroup
   *
   * @param {Request} request
   * @param {Response} response
   */
  static updateGroupMembers(request: Request, response: Response) {
    const Schema = new evalidate.schema({});

    const data = request.body;
    const result = Schema.validate(data);
    if (result.isValid) {
      CommunicationGroupService.updateGroupMembers(data)
        .then((result) => response.status(200).json(result))
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
   * Create CommunicationGroup
   *
   * @param {Request} request
   * @param {Response} response
   */
  static updateLastSeen(request: Request, response: Response) {
    const Schema = new evalidate.schema({
      communication_group_id: evalidate.number().required(),
      user_id: evalidate.number().required(),
      last_seen: evalidate.date().required(),
    });

    const data = request.body;
    const user: any = request.user;
    data.user_id = user.id;
    const result = Schema.validate(data);
    if (result.isValid) {
      CommunicationGroupService.updateLastSeen(data)
        .then((result) => response.status(200).json(result))
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
   * Delete CommunicationGroup
   *
   * @param {Request} request
   * @param {Response} response
   */
  static delete(request: Request, response: Response) {
    let id = request.params.id;
    CommunicationGroupService.delete(id)
      .then(() => response.status(200).json(true))
      .catch((error) => response.status(error.statusCode).json(error.payload));
  }
}

export default CommunicationGroupController;
