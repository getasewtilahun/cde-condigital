import {
  InternalServerError,
  BadRequestError,
  NotFoundError,
} from "../../errors/Errors";
import { createTransaction, } from "../../utilities/database/sequelize";
import async from "async";
import { Transaction } from "sequelize/types";
import ReportDAL from "../../dals/Report/Reports.dal";
import DocumentDAL from "../../dals/Document.dal";
import { Report } from "../../models/Report/Report.model";

class ReportService {
  /**
   * Create  Report
   *
   * @param {Report} report
   * @param {Transaction} transaction
   */

  static create(report: any, transaction?: Transaction): Promise<any> {
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
              name: `Report (${report.name})`,
              project_id: report.project_id,
              user_id: report.user_id,
              url: report.url,
              is_private: true,
              type: "Report",
              size: report.size,
            };

            console.log("this is  report");
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
            ReportDAL.create({ ...report, document_id }, transaction)
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
   * Find All Report
   *
   * @param {string} term
   *
   * @returns {Promise<Report[]>}
   */
  public static findAll(query: any): Promise<Report[]> {
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

      ReportDAL.findMany(updateQuery)
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
   * Find ReportBy ID
   *
   * @param {string} id
   */
  public static findByID(id: string): Promise<Report> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      ReportDAL.findOne(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
 * update Report
 * @param {int} id
 * @param {Report} payload
 */
  static update(id: number, payload: Report, transaction?: Transaction) {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          // Step 1: Find the report by ID
          (done: Function) => {
            ReportDAL.findOne({ id: id })
              .then((report) => {
                if (report) {
                  done(null, report); // Pass the found report to the next step
                } else {
                  done(new NotFoundError("Document not found")); // Report not found error
                }
              })
              .catch((error) => done(new InternalServerError(error))); // Internal server error
          },

          (foundReport: Report, done: Function) => {
            if (payload.size) {
              const document = {
                name: `Document Assignment (${payload.name})`,
                project_id: payload.project_id,
                user_id: payload.user_id,
                url: payload.url,
                is_private: true,
                type: "Document Assignment",
                size: payload.size,
              };

              console.log("Creating document:");
              console.log(document);

              DocumentDAL.create(document, transaction)
                .then((createdDocument) => done(null, foundReport, createdDocument.id))
                .catch((error) => done(new InternalServerError(error)));
            } else {
              // No document creation needed if size is not provided
              done(null, foundReport, null);
            }
          },

          (foundReport: Report, documentId: number, done: Function) => {
            let updatedPayload;
            if (documentId) {
              updatedPayload = { ...payload, document_id: documentId } as Report;
            } else {
              updatedPayload = { ...payload } as Report;
            }

            ReportDAL.update(foundReport, updatedPayload, documentId, transaction)
              .then((updatedReport) => {
                done(null, updatedReport); // Pass the updated report to the final callback
              })
              .catch((error) => done(new BadRequestError(error))); // Handle update error
          }

        ],
        // Final callback after all steps are completed
        (error, updatedReport) => {
          if (error) {
            console.log(error); // Log any errors occurred during the waterfall steps
            reject(error); // Reject the promise if there's an error
          } else {
            resolve(updatedReport); // Resolve with the updated report if all steps are successful
          }
        }
      );
    });
  }



  /**
   * Delete Report By ID
   *
   * @param {string} id
   */
  public static delete(id: string): Promise<Report> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      ReportDAL.delete(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }
}

export default ReportService;
