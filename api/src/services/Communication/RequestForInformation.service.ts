import {
  InternalServerError,
  BadRequestError,
  NotFoundError,
} from "../../errors/Errors";
import { createTransaction, } from "../../utilities/database/sequelize";
import async from "async";
import { Transaction } from "sequelize/types";
import RequestForInformationDAL from "../../dals/Communication/RequestForInformation.dal";
import DocumentDAL from "../../dals/Document.dal";
import { RequestForInformation } from "../../models/Communication/RequestForInformation.model";
import RequestForInformationStatusDAL from "../../dals/Communication/RequestForInformationStatus.dal";

class RequestForInformationService {
  /**
   * Create  RequestForInformation
   *
   * @param {RequestForInformation} request_for_information
   * @param {Transaction} transaction
   */

  static create(request_for_information: any, transaction?: Transaction): Promise<any> {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            createTransaction()
              .then((transaction) => done(null, transaction))
              .catch((error) => reject(new InternalServerError(error)));
          },
          (transaction: Transaction, done: Function) => {
            let document = {
              name: `Document Assignment (${request_for_information.name})`,
              project_id: request_for_information.project_id,
              user_id: request_for_information.user_id,
              url: request_for_information.url,
              is_private: true,
              type: "Document Assignment",
              size: request_for_information.size,
            };

            console.log("this is  request for information service");
            console.log(document);

            DocumentDAL.create(document, transaction)
              .then((result) => done(null, transaction, result.id))
              .catch((error) => {
                console.log("ddddddddddddddddddddddd", error);
                done(new InternalServerError(error), transaction)
              }
              );
          },

          (transaction: Transaction, document_id: number, done: Function) => {
            console.log('Document ID', document_id);
            RequestForInformationDAL.create({ ...request_for_information, document_id }, transaction)
              .then((result) => done(null, transaction, result.id))
              .catch((error) =>
                done(new InternalServerError(error), transaction)
              );
          },
        ],
        (error, transaction: any) => {
          if (error) {
            reject(error);
            console.log(error);
            transaction.rollback();
          } else {
            transaction.commit();
            resolve(true);
          }
        }
      );
    });
  }

  /**
   * Find All RequestForInformation
   *
   * @param {string} term
   *
   * @returns {Promise<RequestForInformation[]>}
   */
  public static findAll(query: any): Promise<RequestForInformation[]> {
    return new Promise((resolve, reject) => {
      let updateQuery: any = {}
      if (query.project_id) {
        updateQuery.project_id = query.project_id;
      }
      if (query.type) {
        updateQuery = {
          ...updateQuery,
          type: query.type
        }
      }

      RequestForInformationDAL.findMany(updateQuery)
        .then((docs: any) => {
          resolve(docs);
        })
        .catch((error: any) => {
          console.log('service kkkkkkkkkkkkkkkkkk', error);
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find RequestForInformationBy ID
   *
   * @param {string} id
   */
  public static findByID(id: string): Promise<RequestForInformation> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      RequestForInformationDAL.findOne(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
  * Update RequestForInformation
  *
  * @param {number} id - ID of the RequestForInformation to update
  * @param {RequestForInformation} payload - Updated data
  * @param {Transaction} transaction - Optional transaction for Sequelize
  */
  static update(id: number, payload: RequestForInformation, transaction?: Transaction): Promise<any> {
    console.log("Updating RequestForInformation with id:", id);
    console.log("Updating RequestForInformation Data:", payload);

    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          // Step 1: Find the existing RequestForInformation by ID
          (done: Function) => {
            RequestForInformationDAL.findOne({ id: id })
              .then((request_for_information) => {
                if (request_for_information) {
                  done(null, request_for_information);
                } else {
                  done(new NotFoundError("RequestForInformation not found"));
                }
              })
              .catch((error) => done(new InternalServerError(error)));
          },
          // Step 2: Create a transaction if not provided
          (request_for_information: RequestForInformation, done: Function) => {
            if (!transaction) {
              createTransaction()
                .then((newTransaction) => done(null, request_for_information, newTransaction))
                .catch((error) => done(new InternalServerError(error)));
            } else {
              done(null, request_for_information, transaction);
            }
          },
          // Step 3: Create a new Document
          (request_for_information: RequestForInformation, transaction: Transaction, done: Function) => {
            if (payload.size) {
              let document = {
                name: `Request For Information (${payload.name})`,
                project_id: payload.project_id,
                user_id: payload.user_id,
                url: payload.url,
                is_private: true,
                type: "Request For Information",
                size: payload.size,
              };

              DocumentDAL.create(document, transaction)
                .then((createdDocument) => done(null, request_for_information, createdDocument.id, transaction))
                .catch((error) => done(new InternalServerError(error), transaction));
            } else {
              // No document creation needed if size is not provided
              done(null, request_for_information, null, transaction);
            }
          },
          // Step 4: Update the RequestForInformation with document_id if created
          (request_for_information: RequestForInformation, document_id: any, transaction: Transaction, done: Function) => {
            if (document_id) {
              payload.document_id = document_id; // Update payload with document_id
            }

            RequestForInformationDAL.update(request_for_information, payload, transaction)
              .then((updatedRequestForInformation) => {
                done(null, updatedRequestForInformation, transaction);
              })
              .catch((error) => done(new BadRequestError(error), transaction));
          },
          // Step 5: Create RequestForInformationStatus
          (updatedRequestForInformation: any, transaction: any, done: any) => {
            const requestForInformationStatusPayload = {
              request_for_information_id: updatedRequestForInformation.id,
              status: payload.status,
              message: payload.message,
              from: payload.from,
              user_id: payload.user_id,
              project_id: payload.project_id,
              date: payload.date,
              document_id: payload.document_id, // Use updated document_id from payload
            };
            console.log("lllllllllllllll", requestForInformationStatusPayload);
            RequestForInformationStatusDAL.create(requestForInformationStatusPayload, transaction)
              .then(() => done(null, updatedRequestForInformation, transaction))
              .catch((error) => done(new InternalServerError(error), transaction));
          },
        ],
        // Final callback to handle errors and resolve/reject the promise
        (error: any, result: any, transaction?: Transaction) => {
          if (error) {
            if (transaction) {
              transaction.rollback(); // Rollback transaction on error
            }
            reject(error);
          } else {
            if (transaction) {
              transaction.commit(); // Commit transaction on success
            }
            resolve(result);
          }
        }
      );
    });
  }

  /**
   * Delete RequestForInformation By ID
   *
   * @param {string} id
   */
  public static delete(id: string): Promise<RequestForInformation> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      RequestForInformationDAL.delete(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }
}

export default RequestForInformationService;
