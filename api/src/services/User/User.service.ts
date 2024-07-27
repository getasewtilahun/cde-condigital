import bcrypt from "bcrypt";
import {
  InternalServerError,
  BadRequestError,
  NotFoundError,
} from "../../errors/Errors";
import { createTransaction } from "../../utilities/database/sequelize";
import async from "async";
import { Transaction } from "sequelize/types";
import { Op } from "sequelize";
import UserDAL from "../../dals/User/User.dal";
import { Messages } from "../../errors/Messages";
import { hashPassword } from "../../utilities/helper/helper";
import { User } from "../../models/User/User.model";
import { UserStatus } from "../../constants/constants";
class UserService {
  static updateUserOnly(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log({ payload });
      this.update(payload.id, payload)
        .then((res) => {
          resolve(res);
        })
        .catch((error: any) => {
          console.log(error.payload);
          reject(new InternalServerError(error));
        });
    });
  }

  static updatePassword(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            createTransaction()
              .then((transaction) => done(null, transaction))
              .catch((error) => reject(new InternalServerError(error)));
          },
          (transaction: Transaction, done: Function) => {
            UserDAL.findOne({ id: payload.user_id })
              .then((result) => {
                if (result) {
                  done(null, transaction, result);
                } else done(new NotFoundError("User Not Found"), transaction);
              })
              .catch((error) =>
                done(new InternalServerError(error), transaction)
              );
          },

          (transaction: Transaction, user: User, done: Function) => {
            hashPassword(payload.new_password)
              .then((hash: any) => done(null, transaction, user, hash))
              .catch((error: any) => {
                done(error, transaction);
              });
          },
          (
            transaction: Transaction,
            user: User,
            new_hash: string,
            done: Function
          ) => {
            bcrypt
              .compare(payload.old_password, user.password)
              .then((result) => {
                if (result) {
                  done(null, transaction, user, new_hash);
                } else {
                  done(
                    new BadRequestError([{ message: "Wrong old password " }]),
                    transaction
                  );
                }
              })
              .catch((error) =>
                done(new InternalServerError(error), transaction)
              );
          },

          (
            transaction: Transaction,
            user: User,
            new_hash: string,
            done: Function
          ) => {
            UserDAL.update(user, { password: new_hash }, transaction)
              .then(() => done(null, transaction))
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

  static createEnterpriseUser(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            createTransaction()
              .then((transaction) => done(null, transaction))
              .catch((error) => reject(new InternalServerError(error)));
          },

          (transaction: Transaction, done: Function) => {
            UserDAL.create({ ...payload }, transaction)
              .then((user) => done(null, transaction, user.id))
              .catch((error: any) =>
                done(new InternalServerError(error), transaction)
              );
          },
        ],
        (error, transaction: any) => {
          if (error) {
            reject(error);
            transaction.rollback();
          } else {
            resolve(true);
            transaction.commit();
          }
        }
      );
    });
  }

  /**
   * Find All User
   *
   * @param {string} term
   *
   * @returns {Promise<User[]>}
   */
  public static findAll(query: any): Promise<User[]> {
    return new Promise((resolve, reject) => {
      UserDAL.findMany(query)
        .then((user: any) => {
          resolve(user);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find All User
   *
   * @param {string} term
   *
   * @returns {Promise<User[]>}
   */
  public static findByFeature(q: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let query = {
        status: UserStatus.ACTIVATED,
        [Op.and]: [
          { "$user_role.user_accesses.feature$": q.feature },
          {
            [Op.or]: [
              {
                "$user_role.user_accesses.read$": 1,
              },
              {
                "$user_role.user_accesses.edit$": 1,
              },
              {
                "$user_role.user_accesses.delete$": 1,
              },
              {
                "$user_role.user_accesses.approve$": 1,
              },
              {
                "$user_role.user_accesses.check$": 1,
              },
              {
                "$user_role.user_accesses.write$": 1,
              },
            ],
          },
        ],
      };

      UserDAL.findByFeature(query)
        .then((user) => {
          resolve(
            user.map((e) => ({
              ...e.toJSON(),
              user_role: e.user_role,
              approve: e.user_role?.user_accesses[0]
                ? e.user_role?.user_accesses[0].approve
                : false,
              check: e.user_role?.user_accesses[0]
                ? e.user_role?.user_accesses[0].check
                : false,
            }))
          );
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * ||||||||||||||||||||||||||||||||||||||||||||||||||||||||
   * ||||||||||||||||||||| DO NOT TOUCH |||||||||||||||||||||
   * ||||||||||||||||||||||||||||||||||||||||||||||||||||||||
   *
   *  - used in prApprovedBidAnalysisNotification() in
   *  notification bot service
   */
  public static findWriteAccessUsers(feature: any): Promise<any[]> {
    return new Promise((resolve, reject) => {
      let query = {
        status: UserStatus.ACTIVATED,
        [Op.and]: [
          { "$user_role.user_accesses.feature$": feature },
          { "$user_role.user_accesses.write$": 1 },
        ],
      };

      UserDAL.findByFeature(query)
        .then((user) => {
          resolve(
            user.map((e) => ({
              ...e.toJSON(),
              user_role: e.user_role,
              approve: e.user_role?.user_accesses[0]
                ? e.user_role?.user_accesses[0].approve
                : false,
              check: e.user_role?.user_accesses[0]
                ? e.user_role?.user_accesses[0].check
                : false,
            }))
          );
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find User By ID
   *
   * @param {string} id
   */
  public static findByID(id: string): Promise<User> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      UserDAL.findOne(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find User
   *
   * @param {object} query
   */
  public static findOne(query: object): Promise<User> {
    return new Promise((resolve, reject) => {
      UserDAL.findOne(query)
        .then((result: any) => {
          if (result) resolve(result);
          else reject(new NotFoundError(Messages.USER_NOT_FOUND));
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find User
   *
   * @param {object} query
   */
  public static findByEmail(query: any): Promise<User> {
    return new Promise((resolve, reject) => {
      UserDAL.findByEmail(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find User
   *
   * @param {object} query
   */
  public static isValid(query: object): Promise<boolean> {
    return new Promise((resolve, reject) => {
      UserDAL.findOne(query)
        .then((result: any) => {
          if (result) {
            reject(
              new BadRequestError([{ message: Messages.USER_NAME_EXIST }])
            );
          } else {
            resolve(true);
          }
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  static resetPassword(payload: any): Promise<any> {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            createTransaction()
              .then((transaction) => done(null, transaction))
              .catch((error) => reject(new InternalServerError(error)));
          },
          (transaction: Transaction, done: Function) => {
            UserDAL.findOne({ id: payload.user_id })
              .then((result) => {
                if (result) {
                  done(null, transaction, result);
                } else done(new NotFoundError("User Not Found"), transaction);
              })
              .catch((error) =>
                done(new InternalServerError(error), transaction)
              );
          },

          (transaction: Transaction, user: User, done: Function) => {
            hashPassword("1234")
              .then((hash: any) => done(null, transaction, user, hash))
              .catch((error: any) => {
                done(error, transaction);
              });
          },
          (
            transaction: Transaction,
            user: User,
            new_hash: string,
            done: Function
          ) => {
            UserDAL.update(user, { password: new_hash }, transaction)
              .then(() => done(null, transaction))
              .catch((error) =>
                done(new InternalServerError(error), transaction)
              );
          },
        ],
        (error, transaction: any) => {
          if (error) {
            reject(error);
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
   * update User
   * @param {int} id
   * @param {User} payload
   */
  static update(id: number, payload: any, transaction?: Transaction) {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            UserDAL.findOne({ id: id })
              .then((user) => {
                if (user) {
                  done(null, user);
                } else {
                  done(new NotFoundError("User Not Found"));
                }
              })
              .catch((error) => done(new InternalServerError(error)));
          },
          (user: User, done: Function) => {
            UserDAL.update(user, payload, transaction)
              .then((result) => resolve(result))
              .catch((error) => done(new BadRequestError(error)));
          },
        ],
        (error) => {
          if (error) {
            reject(error);
          }
        }
      );
    });
  }
}

export default UserService;
