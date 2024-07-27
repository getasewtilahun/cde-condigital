import { Transaction } from "sequelize/types";
import { UserLog } from "../../models/User/UserLog.model";
import { User } from "../../models/User/User.model";
import {
  PagedData,
  getPagingData,
} from "../../utilities/Pagination/Pagination";

class UserLogDAL {
  static create(
    user_log: UserLog,
    transaction?: Transaction
  ): Promise<UserLog> {
    return new Promise((resolve, reject) => {
      UserLog.create({ ...user_log }, { transaction: transaction })
        .then((result) => resolve(result))
        .catch((error) => {
          reject(error);
        });
    });
  }

  static findMany(query: any): Promise<UserLog[]> {
    return new Promise((resolve, reject) => {
      UserLog.findAll({
        where: query,
        include: [{ model: User, attributes: ["full_name"] }],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  static findOne(query: any) {
    return new Promise((resolve, reject) => {
      UserLog.findOne({
        where: query,
        include: [],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find Paged  UserLog
   *
   * @param {any} query
   */
  static findPaged(query: any) {
    const { where, limit, offset } = query;
    return new Promise<PagedData<UserLog[]>>((resolve, reject) => {
      UserLog.findAndCountAll({
        where,
        limit: limit,
        offset: offset,
      })
        .then((result) => resolve(getPagingData(result, offset, limit)))
        .catch((error) => reject(error));
    });
  }

  static update(
    user_log: UserLog,
    payload: UserLog,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      if (user_log) {
        if (payload.user_id) user_log.user_id = payload.user_id;
        if (payload.description) user_log.description = payload.description;
        if (payload.table) user_log.table = payload.table;
        if (payload.project_id) user_log.project_id = payload.project_id;
        if (payload.action) user_log.action = payload.action;

        user_log
          .save({ transaction })
          .then((doc) => resolve(doc))
          .catch((error) => reject(error));
      } else {
        resolve(null);
      }
    });
  }

  static delete(query: any) {
    return new Promise((resolve, reject) => {
      UserLog.destroy({ where: query })
        .then(() => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

export default UserLogDAL;
