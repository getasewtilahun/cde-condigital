import {
  InternalServerError,
  BadRequestError,
  NotFoundError,
} from "../../errors/Errors";
import { createTransaction, } from "../../utilities/database/sequelize";
import async from "async";
import { Transaction } from "sequelize/types";
import DocumentStatusDAL from "../../dals/DocumentAssignment/DocumentStatus.dal";
import DocumentDAL from "../../dals/Document.dal";
import { DocumentStatus } from "../../models/DocumentAssignment/DocumentStatus.model";

class DocumentStatusService {

  /**
   * Create  DocumentStatus
   *
   * @param {DocumentStatus} document_status
   * @param {Transaction} transaction
   */

  static create(document_status: any, transaction?: Transaction): Promise<any> {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            createTransaction()
              .then((transaction) => done(null, transaction))
              .catch((error) => done(new InternalServerError(error)));
          },
          (transaction: Transaction, done: Function) => {
            if (!document_status.id) {
              console.log("First Time Creating");
              // Create new document status if id is not provided
              DocumentStatusDAL.create(document_status, transaction)
                .then(() => {
                  console.log("Created Document Status:", document_status);
                  done(null, transaction);
                })
                .catch((error) => done(new InternalServerError(error), transaction));
            } else {
              console.log("Update existing document status");
              // Update existing document status
              const { id, ...updateData } = document_status;
              const isApproved = document_status.action_status === "Approved";
              const isRejected = document_status.action_status === "Rejected";
              const isRequested = document_status.action_status === "Requested";
              const updateFields = isRejected || isRequested ? updateData : { action_status: document_status.action_status, comment: document_status.comment, requested_status: document_status.requested_status, authorized_by: document_status.authorized_by, };

              // Check if requested_status starts with 'A' or 'B' and update current_status accordingly
              if (/^[AB]/.test(document_status.requested_status)) {
                updateFields.current_status = "S5";
              }

              this.update(document_status.id, updateFields, transaction)
                .then(() => {
                  console.log("Updated Document Status:", document_status);

                  if (isApproved && !document_status.authorized_by) {
                    // Create new status if approved
                    DocumentStatusDAL.findOne({ id: document_status.id })
                      .then((prevStatus) => {
                        const previousStatus = prevStatus as DocumentStatus; // Type assertion here
                        const newStatus = {
                          ...previousStatus.toJSON(),
                          current_status: document_status.current_status,
                          requested_status: document_status.requested_status,
                          approved_by: document_status.approved_by,
                          accepted_by: document_status.accepted_by,
                          type_on_status: document_status.type_on_status,
                          action_status: "",
                          id: null // Set id to null to create a new record
                        };

                        // Conditionally add revision field if present
                        if (document_status.revision) {
                          newStatus.revision = document_status.revision;
                        }

                        DocumentStatusDAL.create(newStatus, transaction)
                          .then(() => done(null, transaction))
                          .catch((error) => done(new InternalServerError(error), transaction));
                      })
                      .catch((error) => done(new InternalServerError(error), transaction));
                  }

                  else {
                    done(null, transaction); // Continue to next step
                  }
                })
                .catch((error) => done(new InternalServerError(error), transaction));
            }
          },
          (transaction: Transaction, done: Function) => {
            if (document_status.create) {
              DocumentStatusDAL.create(document_status.new_data, transaction)
                .then(() => done(null, transaction))
                .catch((error) => done(new InternalServerError(error), transaction));
            } else {
              done(null, transaction);
            }
          }
        ],
        async (error, transaction: any) => {
          if (error) {
            await transaction.rollback();
            reject(error);
          } else {
            await transaction.commit();
            resolve(true);
          }
        }
      );
    });
  }







  /**
   * Find All DocumentStatus
   *
   * @param {string} term
   *
   * @returns {Promise<DocumentStatus[]>}
   */
  public static findAll(query: any): Promise<DocumentStatus[]> {
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

      DocumentStatusDAL.findMany(updateQuery)
        .then((docs: any) => {
          resolve(docs);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find DocumentStatusBy ID
   *
   * @param {string} id
   */
  public static findByID(id: string): Promise<DocumentStatus> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      DocumentStatusDAL.findOne(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
 * update DocumentStatus
 * @param {int} id
 * @param {DocumentStatus} payload
 */
  static update(id: number, payload: DocumentStatus, transaction?: Transaction) {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            DocumentStatusDAL.findOne({ id: id })
              .then((document_status) => {
                if (document_status) {
                  done(null, document_status);
                } else {
                  done(new NotFoundError("Document not found"));
                }
              })
              .catch((error) => done(new InternalServerError(error)));
          },
          (document_status: DocumentStatus, done: Function) => {

            DocumentStatusDAL.update(document_status, payload, transaction)
              .then((updatedDocumentStatus) => {
                done(null, updatedDocumentStatus);
              })
              .catch((error) => {
                done(new BadRequestError(error))
              });
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
   * Delete DocumentStatus By ID
   *
   * @param {string} id
   */
  public static delete(id: string): Promise<DocumentStatus> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      DocumentStatusDAL.delete(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }
}

export default DocumentStatusService;
