import {
  InternalServerError,
  BadRequestError,
  NotFoundError,
} from "../errors/Errors";
import {
  createTransaction,
  ReviewForApproval,
} from "../utilities/database/sequelize";
import async from "async";
import { Transaction } from "sequelize/types";
import ReviewForApprovalDAL from "../dals/ReviewForApproval.dal";
import { Messages } from "../errors/Messages";
import LogService from "./Log.service";
import DocumentDAL from "../dals/Document.dal";
class ReviewForApprovalService {
  /**
   * Create  ReviewForApproval
   *
   * @param {ReviewForApproval} review_approval
   * @param {Transaction} transaction
   */

  static create(review_approval: any, transaction?: Transaction): Promise<any> {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            createTransaction()
              .then((transaction) => done(null, transaction))
              .catch((error) => reject(new InternalServerError(error)));
          },
          (transaction: Transaction, done: Function) => {
            if (review_approval.url) {
              let document = {
                name: `Review for Approval(${review_approval.name})`,
                project_id: review_approval.project_id,
                user_id: review_approval.user_id,
                url: review_approval.url,
                is_private: true,
                type: `Review for Approval`,
                size: review_approval.size,
              };
              DocumentDAL.create(document, transaction)
                .then((result) => done(null, transaction, result.id))
                .catch((error) =>
                  done(new InternalServerError(error), transaction)
                );
            } else {
              done(null, transaction, null);
            }
          },
          (transaction: Transaction, document_id: number, done: Function) => {
            if (review_approval.id) {
              this.update(
                review_approval.id,
                { ...review_approval, document_id },
                transaction
              )
                .then(() => done(null, transaction))
                .catch((error) => done(error, transaction));
            } else {
              ReviewForApprovalDAL.create(
                { ...review_approval, document_id },
                transaction
              )
                .then(() => done(null, transaction))
                .catch((error) =>
                  done(new InternalServerError(error), transaction)
                );
            }
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
   * Find All ReviewForApproval
   *
   * @param {string} term
   *
   * @returns {Promise<ReviewForApproval[]>}
   */
  public static findAll(query: any): Promise<ReviewForApproval[]> {
    console.log({ query });
    return new Promise((resolve, reject) => {
      ReviewForApprovalDAL.findMany(query)
        .then((user: any) => {
          resolve(user);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find ReviewForApprovalBy ID
   *
   * @param {string} id
   */
  public static findByID(id: string): Promise<ReviewForApproval> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      ReviewForApprovalDAL.findOne(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * update ReviewForApproval
   * @param {int} id
   * @param {ReviewForApproval} payload
   */
  static update(
    id: number,
    payload: ReviewForApproval,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            ReviewForApprovalDAL.findOne({ id: id })
              .then((review_approval) => {
                if (review_approval) {
                  done(null, review_approval);
                } else {
                  done(new NotFoundError("Review For Approval not found"));
                }
              })
              .catch((error) => done(new InternalServerError(error)));
          },
          (review_approval: ReviewForApproval, done: Function) => {
            ReviewForApprovalDAL.update(review_approval, payload, transaction)
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

  /**
   * Delete ReviewForApproval By ID
   *
   * @param {string} id
   */
  public static delete(id: string): Promise<ReviewForApproval> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      ReviewForApprovalDAL.delete(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }
}

export default ReviewForApprovalService;
