import {
  InternalServerError,
  BadRequestError,
  NotFoundError,
} from "../../errors/Errors";
import async from "async";
import { Transaction } from "sequelize/types";

import UserLogDAL from "../../dals/User/UserLog.dal";
import { UserLog } from "../../models/User/UserLog.model";

class UserLogService {
  static create(user_log: any, transaction?: Transaction): Promise<any> {
    return new Promise((resolve, reject) => {
      UserLogDAL.create(user_log, transaction)
        .then((result) => resolve(result))
        .catch((error) => reject(new InternalServerError(error)));
    });
  }

  public static findAll(query: any): Promise<UserLog[]> {
    return new Promise((resolve, reject) => {
      UserLogDAL.findMany(query)
        .then((result) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  public static findByID(id: string): Promise<UserLog> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      UserLogDAL.findOne(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  static update(id: number, payload: UserLog, transaction?: Transaction) {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            UserLogDAL.findOne({ id: id })
              .then((user_log) => {
                if (user_log) {
                  done(null, user_log);
                } else {
                  done(new NotFoundError("Not Found"));
                }
              })
              .catch((error) => done(new InternalServerError(error)));
          },
          (data: UserLog, done: Function) => {
            UserLogDAL.update(data, payload, transaction)
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

  public static findPaged(query: any) {
    return new Promise((resolve, reject) => {
      UserLogDAL.findPaged(query)
        .then((result) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  public static delete(id: string): Promise<UserLog> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      UserLogDAL.delete(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }
}

export default UserLogService;
