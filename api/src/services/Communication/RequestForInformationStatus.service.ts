import {
  InternalServerError,
  BadRequestError,
  NotFoundError,
} from "../../errors/Errors";
import { createTransaction, } from "../../utilities/database/sequelize";
import async from "async";
import { Transaction } from "sequelize/types";
import RequestForInformationStatusDAL from "../../dals/Communication/RequestForInformationStatus.dal";
import DocumentDAL from "../../dals/Document.dal";
import { RequestForInformationStatus } from "../../models/Communication/RequestForInformationStatus.model";

class RequestForInformationStatusService {
  /**
   * Create  RequestForInformationStatus
   *
   * @param {RequestForInformationStatus} request_for_information_status
   * @param {Transaction} transaction
   */

  static create(request_for_information_status: any, transaction?: Transaction): Promise<any> {
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
              name: `Document Assignment (${request_for_information_status.name})`,
              project_id: request_for_information_status.project_id,
              user_id: request_for_information_status.user_id,
              url: request_for_information_status.url,
              is_private: true,
              type: "Document Assignment",
              size: request_for_information_status.size,
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
            RequestForInformationStatusDAL.create({ ...request_for_information_status, document_id }, transaction)
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
   * Find All RequestForInformationStatus
   *
   * @param {string} term
   *
   * @returns {Promise<RequestForInformationStatus[]>}
   */
  public static findAll(query: any): Promise<RequestForInformationStatus[]> {
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

      RequestForInformationStatusDAL.findMany(updateQuery)
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
   * Find RequestForInformationStatusBy ID
   *
   * @param {string} id
   */
  public static findByID(id: string): Promise<RequestForInformationStatus> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      RequestForInformationStatusDAL.findOne(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
 * update RequestForInformationStatus
 * @param {int} id
 * @param {RequestForInformationStatus} payload
 */
  static update(id: number, payload: RequestForInformationStatus, transaction?: Transaction) {
    console.log("this is document assignment service");
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            RequestForInformationStatusDAL.findOne({ id: id })
              .then((request_for_information_status) => {
                if (request_for_information_status) {
                  done(null, request_for_information_status);
                } else {
                  done(new NotFoundError("Document not found"));
                }
              })
              .catch((error) => done(new InternalServerError(error)));
          },
          (request_for_information_status: RequestForInformationStatus, done: Function) => {
            RequestForInformationStatusDAL.update(request_for_information_status, payload, transaction)
              .then((updatedRequestForInformationStatus) => {
                done(null, updatedRequestForInformationStatus);
              })
              .catch((error) => done(new BadRequestError(error)));
          },
        ],
        (error) => {
          if (error) {
            reject(error);
          } else {
            resolve(true);
          }
        }
      );
    });
  }


  /**
   * Delete RequestForInformationStatus By ID
   *
   * @param {string} id
   */
  public static delete(id: string): Promise<RequestForInformationStatus> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      RequestForInformationStatusDAL.delete(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }
}

export default RequestForInformationStatusService;
