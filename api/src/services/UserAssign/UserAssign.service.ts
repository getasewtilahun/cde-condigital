import {
  InternalServerError,
  BadRequestError,
  NotFoundError,
} from "../../errors/Errors";
import { UserAssign } from "../../models/UserAssign/UserAssign.model";
import { createTransaction } from "../../utilities/database/sequelize";
import async from "async";
import { Transaction } from "sequelize/types";
import UserAssignDAL from "../../dals/UserAssign/UserAssign.dal";
class UserAssignService {
  /**
   * Create  UserAssign
   *
   * @param {UserAssign} user_assign
   * @param {Transaction} transaction
   */

  static create(user_assign: UserAssign[]): Promise<any> {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            createTransaction()
              .then((transaction) => done(null, transaction))
              .catch((error) => reject(new InternalServerError(error)));
          },
          (transaction: Transaction, done: Function) => {
            UserAssignDAL.createBulk(user_assign, transaction)
              .then(() => done(null, transaction))
              .catch((error: any) =>
                done(new InternalServerError(error), transaction)
              );
          },
        ],
        (error, transaction: any) => {
          console.log('service', error);
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
   * Find All UserAssign
   *
   * @param {string} term
   *
   * @returns {Promise<UserAssign[]>}
   */
  public static findAll(query: any): Promise<UserAssign[]> {
    return new Promise((resolve, reject) => {
      console.log("dal query", query)
      UserAssignDAL.findMany(query)
        .then((user: any) => {
          resolve(user);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find Paged UserAssign
   *
   * @param {string} query
   *
   * @returns {Promise<UserAssign[]>}
   */
  public static findPaged(query: any) {
    return new Promise((resolve, reject) => {
      UserAssignDAL.findPaged(query)
        .then((result: any) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find UserAssign By ID
   *
   * @param {string} id
   */
  public static findByID(id: string): Promise<UserAssign> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      UserAssignDAL.findOne(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * update UserAssign
   * @param {int} id
   * @param {UserAssign} payload
   */
  static update(id: number, payload: UserAssign, transaction?: Transaction) {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            UserAssignDAL.findOne({ id: id })
              .then((user_assign: any) => {
                if (user_assign) {
                  done(null, user_assign);
                } else {
                  done(new NotFoundError("UserAssign Not Found"));
                }
              })
              .catch((error: any) => done(new InternalServerError(error)));
          },
          (user_assign: UserAssign, done: Function) => {
            UserAssignDAL.update(user_assign, payload, transaction)
              .then((result: any) => resolve(result))
              .catch((error: any) => done(new BadRequestError(error)));
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
   * Delete UserAssign By ID
   *
   * @param {string} id
   */
  public static delete(id: string): Promise<UserAssign> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      UserAssignDAL.delete(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }
}

export default UserAssignService;
