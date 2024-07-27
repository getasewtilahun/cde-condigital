import async from "async";
import { Transaction } from "sequelize/types";
import { UserAccessDAL } from "../../dals/User";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../../errors/Errors";
import { UserAccess } from "../../models/User/UserAccess.model";
import { createTransaction } from "../../utilities/database/sequelize";
import UserLogService from "./UserLog.service";

class UserAccessService {
  /**
   * Create  UserAccess
   *
   * @param {UserAccess} user_access
   * @param {Transaction} transaction
   */

  static create(payload: any[], transaction?: Transaction): Promise<any> {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            async.eachSeries(
              payload,
              (user_access, callback) => {
                if (user_access.id)
                  this.update(user_access.id, user_access, transaction)
                    .then(() => callback())
                    .catch((error) => callback(error));
                else
                  UserAccessDAL.create(user_access, transaction)
                    .then(() => callback())
                    .catch((error) => callback(new InternalServerError(error)));
              },
              (error: any) => {
                error ? done(error, transaction) : done(null, transaction);
              }
            );
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
   * Find All UserAccess
   *
   * @param {string} term
   *
   * @returns {Promise<UserAccess[]>}
   */
  public static findAll(query: any): Promise<UserAccess[]> {
    return new Promise((resolve, reject) => {
      UserAccessDAL.findMany(query)
        .then((user: any) => {
          resolve(user);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find Paged UserAccess
   *
   * @param {string} query
   *
   * @returns {Promise<UserAccess[]>}
   */
  public static findPaged(query: any) {
    return new Promise((resolve, reject) => {
      UserAccessDAL.findPaged(query)
        .then((result) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find UserAccess By ID
   *
   * @param {string} id
   */
  public static findByID(id: string): Promise<UserAccess> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      UserAccessDAL.findOne(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * update UserAccess
   * @param {int} id
   * @param {UserAccess} payload
   */
  static update(id: number, payload: UserAccess, transaction?: Transaction) {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            UserAccessDAL.findOne({ id: id })
              .then((user_access) => {
                if (user_access) {
                  done(null, user_access);
                } else {
                  done(new NotFoundError("User Access Not Found"));
                }
              })
              .catch((error) => done(new InternalServerError(error)));
          },
          (user_access: UserAccess, done: Function) => {
            UserAccessDAL.update(user_access, payload, transaction)
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
   * Delete UserAccess By ID
   *
   * @param {string} id
   */
  public static delete(id: string): Promise<UserAccess> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      UserAccessDAL.delete(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }
}

export default UserAccessService;
