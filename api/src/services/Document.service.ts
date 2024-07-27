import {
  InternalServerError,
  BadRequestError,
  NotFoundError,
} from "../errors/Errors";
import { createTransaction, Document } from "../utilities/database/sequelize";
import async from "async";
import { Transaction } from "sequelize/types";
import DocumentDAL from "../dals/Document.dal";
import { Messages } from "../errors/Messages";
import { ALLOWED_FILE_SIZE, BuildType } from "../constants/constants";
import fs from "fs";
import config from "config";
class DocumentService {
  /**
   * Create Document
   *
   * @param {Document} document
   * @param {Transaction} transaction
   */

  static create(document: any, transaction?: Transaction): Promise<Document> {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            DocumentDAL.findMany({ user_id: document.user_id })
              .then((documents) => done(null, documents))
              .catch((error) => done(new InternalServerError(error)));
          },
          (documents: Document[], done: Function) => {
            let size = documents.reduce(
              (total, current) => total + current.size,
              0
            );
            console.log(size, document.size);
            if (
              size + document.size < ALLOWED_FILE_SIZE ||
              config.get("app.build_type") == BuildType.ENTERPRISE
            ) {
              DocumentDAL.create(document, transaction)
                .then((document) => resolve(document))
                .catch((error) => done(new InternalServerError(error)));
            } else {
              done(
                new BadRequestError([
                  { message: Messages.FILE_SIZE_GREATER_THAN_ALLOWED },
                ])
              );
            }
          },
        ],
        (error) => {
          if (error) {
            console.log({ error });
            reject(error);
          } else {
          }
        }
      );
    });
  }

  /**
   * Find All Document
   *
   * @param {string} term
   *
   * @returns {Promise<Document[]>}
   */
  public static findAll(query: any): Promise<Document[]> {
    return new Promise((resolve, reject) => {
      DocumentDAL.findMany(query)
        .then((user: any) => {
          resolve(user);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find Document By ID
   *
   * @param {string} id
   */
  public static findByID(id: any): Promise<Document> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      DocumentDAL.findOne(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new NotFoundError(error));
        });
    });
  }

  /**
   * update Document
   * @param {int} id
   * @param {Document} payload
   */
  static update(id: number, payload: Document, transaction?: Transaction) {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            DocumentDAL.findOne({ id: id })
              .then((document) => {
                if (document) {
                  done(null, document);
                } else {
                  done(new NotFoundError(Messages.DOCUMENT_NOT_FOUND));
                }
              })
              .catch((error) => done(new InternalServerError(error)));
          },
          (document: Document, done: Function) => {
            DocumentDAL.update(document, payload, transaction)
              .then((result) => resolve(result))
              .catch((error) => done(new BadRequestError(error)));
          },
        ],
        (error) => {
          if (error) {
            console.log(error);
            reject(error);
          }
        }
      );
    });
  }

  static delete(id: any, t?: Transaction) {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            if (t) done(null, t);
            else
              createTransaction()
                .then((transaction) => done(null, transaction))
                .catch((error) => reject(new InternalServerError(error)));
          },

          (transaction: Transaction, done: Function) => {
            DocumentDAL.findOne({ id: id })
              .then((document) => {
                if (document) {
                  done(null, transaction, document);
                } else {
                  done(
                    new NotFoundError(Messages.DOCUMENT_NOT_FOUND),
                    transaction
                  );
                }
              })
              .catch((error) =>
                done(new InternalServerError(error), transaction)
              );
          },
          (transaction: Transaction, document: Document, done: Function) => {
            DocumentDAL.delete({ id: document.id }, transaction)
              .then(() => done(null, transaction, document))
              .catch((error) => {
                console.log({ error });
                done(new InternalServerError(error), transaction);
              });
          },
          (transaction: Transaction, document: Document, done: Function) => {
            fs.unlink(document.url, (error: any) =>
              error
                ? done(new InternalServerError(error), transaction)
                : done(null, transaction)
            );
          },
        ],
        (error, transaction: any) => {
          if (error) {
            if (!t) transaction.rollback();
            reject(error);
          } else {
            if (!t) transaction.commit();
            resolve(true);
          }
        }
      );
    });
  }
}

export default DocumentService;
