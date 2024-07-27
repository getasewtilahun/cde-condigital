import {
  InternalServerError,
  BadRequestError,
  NotFoundError,
} from "../../errors/Errors";

import async from "async";
import { Transaction } from "sequelize/types";
import { UserRole } from "../../models/User/UserRole.model";
import { createTransaction } from "../../utilities/database/sequelize";
import { UserRoleDAL } from "../../dals/User";
import UserAccessService from "./UserAccess.service";

class UserRoleService {
  /**
   * Create  UserRole
   *
   * @param {UserRole} user
   * @param {Transaction} transaction
   */

  static create(payload: UserRole): Promise<any> {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            createTransaction()
              .then((transaction) => done(null, transaction))
              .catch((error) => reject(new InternalServerError(error)));
          },
          (transaction: Transaction, done: Function) => {
            if (payload.id)
              this.update(payload.id, payload, transaction)
                .then(() => done(null, transaction, payload.id))
                .catch((error) => done(error, transaction));
            else
              UserRoleDAL.create(payload, transaction)
                .then((result) => done(null, transaction, result.id))
                .catch((error) => done(error, transaction));
          },
          (transaction: Transaction, user_role_id: number, done: Function) => {
            UserAccessService.create(
              payload.user_accesses.map((e) => ({ ...e, user_role_id })),
              transaction
            )
              .then(() => done(null, transaction))
              .catch((error) => done(error, transaction));
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
   * Find All UserRole
   *
   * @param {string} term
   *
   * @returns {Promise<UserRole[]>}
   */
  public static findAll(query: any): Promise<UserRole[]> {
    return new Promise((resolve, reject) => {
      UserRoleDAL.findMany(query)
        .then((user: any) => {
          resolve(user);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find Paged UserRole
   *
   * @param {string} query
   *
   * @returns {Promise<UserRole[]>}
   */
  public static findPaged(query: any) {
    return new Promise((resolve, reject) => {
      UserRoleDAL.findPaged(query)
        .then((result) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find UserRole By ID
   *
   * @param {string} id
   */
  public static findByID(id: string): Promise<UserRole> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      UserRoleDAL.findOne(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * update UserRole
   * @param {int} id
   * @param {UserRole} payload
   */
  static update(id: number, payload: UserRole, transaction?: Transaction) {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            UserRoleDAL.findOne({ id: id })
              .then((user) => {
                if (user) {
                  done(null, user);
                } else {
                  done(new NotFoundError("Material Major Category Not Found"));
                }
              })
              .catch((error) => done(new InternalServerError(error)));
          },
          (user: UserRole, done: Function) => {
            UserRoleDAL.update(user, payload, transaction)
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
   * Delete UserRole By ID
   *
   * @param {string} id
   */
  public static delete(id: string): Promise<UserRole> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      UserRoleDAL.delete(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }
}

export default UserRoleService;
