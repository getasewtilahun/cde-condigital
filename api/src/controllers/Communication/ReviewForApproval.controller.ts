// import evalidate from "evalidate";
// import { Request, Response } from "express";
// import { Messages } from "../../errors/Messages";
// import { Error, BadRequestError, NotFoundError } from "../../errors/Errors";
// import ReviewForApprovalService from "../../services/Communication/ReviewForApproval.service";
// import config from "config";
// import { BuildType } from "../../constants/constants";
// import { toNumber } from "lodash";

// class ReviewForApprovalController {
//   /**
//    * Create ReviewForApproval
//    *
//    * @param {Request} request
//    * @param {Response} response
//    */
//   static create(request: Request, response: Response) {
//     const Schema = new evalidate.schema({
//       // Define the schema for validation
//     });

//     const data = request.body;
//     const user = request.user; // user is now properly typed
//     if (request.file) {
//       data.url = request.file.path;
//       data.size = request.file.size;
//       data.name = request.file.originalname;
//     }
//     if (data.id) data.id = toNumber(data.id);
//     data.project_id = toNumber(data.project_id);
//     data.from = toNumber(data.from);
//     data.considered_doc_id = toNumber(data.considered_doc_id);
//     if (user) {
//       data.user_id = user.id;
//     }

//     const result = Schema.validate(data);
//     if (result.isValid) {
//       ReviewForApprovalService.create(data)
//         .then(() => response.status(200).json(true))
//         .catch((error) => {
//           console.log(error);
//           response.status(error.statusCode).json(error.payload);
//         });
//     } else {
//       const error = new BadRequestError(result.errors);
//       response.status(error.statusCode).json(error.payload);
//     }
//   }

//   /**
//    * Find All ReviewForApproval
//    *
//    * @param {Request} request
//    * @param {Response} response
//    */
//   static findAll(request: Request, response: Response) {
//     const user = request.user; // user is now properly typed
//     let query: any =
//       config.get("app.build_type") === BuildType.PROJECT
//         ? { user_id: user?.id }
//         : {};

//     if (request.query.project_id && request.query.project_id !== "undefined") {
//       query = { project_id: request.query.project_id, ...query };
//     }

//     ReviewForApprovalService.findAll(query)
//       .then((result) => {
//         response.json(result);
//       })
//       .catch((error: Error) => {
//         response.status(error.statusCode).json(error.payload);
//       });
//   }

//   /**
//    * Find ReviewForApproval By ID
//    *
//    * @param {Request} request
//    * @param {Response} response
//    */
//   static findByID(request: Request, response: Response) {
//     ReviewForApprovalService.findByID(request.params.id)
//       .then((result) => {
//         if (result) {
//           response.json(result);
//         } else {
//           const error: Error = new NotFoundError("Review For Approval not found");
//           response.status(error.statusCode).json(error.payload);
//         }
//       })
//       .catch((error: Error) => {
//         response.status(error.statusCode).json(error.payload);
//       });
//   }

//   /**
//    * Update ReviewForApproval
//    *
//    * @param {Request} request
//    * @param {Response} response
//    */
//   static update(request: Request, response: Response) {
//     const Schema = new evalidate.schema({
//       id: evalidate.number().required(),
//     });

//     const data = request.body;
//     const result = Schema.validate(data);
//     if (result.isValid) {
//       ReviewForApprovalService.update(data.id, data)
//         .then(() => response.status(200).json(true))
//         .catch((error) => {
//           console.log(error);
//           response.status(error.statusCode).json(error.payload);
//         });
//     } else {
//       const error = new BadRequestError(result.errors);
//       response.status(error.statusCode).json(error.payload);
//     }
//   }

//   /**
//    * Delete ReviewForApproval
//    *
//    * @param {Request} request
//    * @param {Response} response
//    */
//   static delete(request: Request, response: Response) {
//     const id = request.params.id;
//     ReviewForApprovalService.delete(id)
//       .then(() => response.status(200).json(true))
//       .catch((error) => response.status(error.statusCode).json(error.payload));
//   }
// }

// export default ReviewForApprovalController;
