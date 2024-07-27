import {
  InternalServerError,
  BadRequestError,
  NotFoundError,
} from "../../errors/Errors";
import { createTransaction, } from "../../utilities/database/sequelize";
import async from "async";
import { Transaction } from "sequelize/types";
import DocumentAssignmentDAL from "../../dals/DocumentAssignment/DocumentAssignment.dal";
import DocumentDAL from "../../dals/Document.dal";
import { DocumentAssignment } from "../../models/DocumentAssignment/DocumentAssignment.model";
import DocumentStatusDAL from "../../dals/DocumentAssignment/DocumentStatus.dal";
import { DocumentStatus } from "../../models/DocumentAssignment";

class DocumentAssignmentService {
  /**
   * Create  DocumentAssignment
   *
   * @param {DocumentAssignment} document_assignment
   * @param {Transaction} transaction
   */

  static create(document_assignment: any, transaction?: Transaction): Promise<any> {
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
              name: `Document Assignment (${document_assignment.name})`,
              project_id: document_assignment.project_id,
              user_id: document_assignment.user_id,
              url: document_assignment.url,
              is_private: true,
              type: "Document Assignment",
              size: document_assignment.size,
            };

            console.log("this is document assignment service");
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
            console.log('Document assignment', document_id);
            DocumentAssignmentDAL.create({ ...document_assignment, document_id }, transaction)
              .then((result) => done(null, transaction, result.id))
              .catch((error) =>
                done(new InternalServerError(error), transaction)
              );
          },
          // (transaction: Transaction, document_assignment_id: number, done: Function) => {
          //   DocumentStatusDAL.create(
          //     document_assignment.document_status.map((e: any) => ({ ...e, document_assignment_id })),
          //     transaction
          //   )
          //     .then(() => done(null, transaction))
          //     .catch((error: any) =>
          //       done(new InternalServerError(error), transaction)
          //     );
          // },
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
   * Find All DocumentAssignment
   *
   * @param {string} term
   *
   * @returns {Promise<DocumentAssignment[]>}
   */
  public static findAll(query: any): Promise<DocumentAssignment[]> {
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

      DocumentAssignmentDAL.findMany(updateQuery)
        .then((docs: any) => {
          // if (query.category && query.folder && query.sub_folder) {
          //   const filtered: DocumentAssignment[] = [];
          //   docs.forEach((doc: any) => {
          //     if (
          //       doc.user_assignment_item.category === query.category &&
          //       doc.user_assignment_item.folder === query.folder &&
          //       doc.user_assignment_item.sub_folder === query.sub_folder &&
          //       (doc.user_id === query.user_id ||
          //         doc.document_assignment_accesses.find((e: any) => e.user_id === query.user_id))
          //     )
          //       filtered.push(doc);
          //   });
          //   resolve(filtered);
          // } else {
          resolve(docs);
          // }
        })
        .catch((error: any) => {
          console.log('service kkkkkkkkkkkkkkkkkk', error);
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find DocumentAssignmentBy ID
   *
   * @param {string} id
   */
  public static findByID(id: string): Promise<DocumentAssignment> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      DocumentAssignmentDAL.findOne(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
  * update DocumentAssignment
  * @param {number} id
  * @param {DocumentAssignment} payload
  * @param {Transaction} [transaction]
  */
  static update(id: number, payload: DocumentAssignment, transaction?: Transaction) {
    console.log(DocumentAssignment, payload);
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            DocumentAssignmentDAL.findOne({ id: id })
              .then((document_assignment) => {
                if (document_assignment) {
                  done(null, document_assignment);
                } else {
                  done(new NotFoundError("Document not found"));
                }
              })
              .catch((error) => done(new InternalServerError(error)));
          },
          (document_assignment: DocumentAssignment, done: Function) => {
            if (payload.size) {
              console.log("this is creating document");
              let document = {
                name: `Document (${payload.name})`,
                project_id: payload.project_id,
                user_id: payload.user_id,
                url: payload.url,
                is_private: true,
                type: "Document",
                size: payload.size,
              };

              DocumentDAL.create(document, transaction)
                .then((createdDocument) => done(null, document_assignment, createdDocument.id))
                .catch((error) => done(new InternalServerError(error)));
            } else {
              // No document creation needed if size is not provided
              done(null, document_assignment, null);
            }
          },
          (document_assignment: DocumentAssignment, document_id: any, done: Function) => {
            if (document_id) {
              console.log("document_id", document_id);
              payload.document_id = document_id; // Update payload with document_id
            }
            console.log("Updated payload:", payload);
            DocumentAssignmentDAL.update(document_assignment, payload, transaction)
              .then((updatedDocumentAssignment) => done(null, updatedDocumentAssignment))
              .catch((error) => done(new BadRequestError(error)));
          },
        ],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }


  /**
   * Delete DocumentAssignment By ID
   *
   * @param {string} id
   */
  public static delete(id: string): Promise<DocumentAssignment> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      DocumentAssignmentDAL.delete(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }
}

export default DocumentAssignmentService;
