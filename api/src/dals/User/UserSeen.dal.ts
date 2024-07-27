import { Transaction } from "sequelize/types";
import { UserSeen } from "../../models/User/UserSeen.model";
import {
  getPagingData,
  PagedData,
} from "../../utilities/Pagination/Pagination";

class UserSeenDAL {
  /**
   * Create  UserSeen
   *
   * @param {UserSeen}  user_seen
   * @param {Transaction} transaction
   */
  static create(user_seen: any, transaction?: Transaction): Promise<UserSeen> {
    return new Promise((resolve, reject) => {
      UserSeen.create(user_seen, {
        transaction: transaction,
      })
        .then((result) => resolve(result))
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Find Many  UserSeen
   *
   * @param {any} query
   */
  static findMany(query: any): Promise<UserSeen[]> {
    return new Promise((resolve, reject) => {
      UserSeen.findAll({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find Paged  UserSeen
   *
   * @param {any} query
   */
  static findPaged(query: any) {
    const { where, limit, offset } = query;
    return new Promise<PagedData<UserSeen[]>>((resolve, reject) => {
      UserSeen.findAndCountAll({
        where,
        limit: limit,
        offset: offset,
      })
        .then((result) => resolve(getPagingData(result, offset, limit)))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One  UserSeen
   *
   * @param {any} query
   */
  static findOne(query: any) {
    return new Promise((resolve, reject) => {
      UserSeen.findOne({
        where: query,
        include: [],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One  UserSeen
   *
   * @param {any} query
   */
  static findId(query: any) {
    return new Promise((resolve, reject) => {
      UserSeen.findOne({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Update  UserSeen
   * @param { UserSeen} material_major_category
   * @param {Object} payload
   */
  static update(
    user_seen: UserSeen,
    payload: Partial<UserSeen>,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      if (user_seen) {
        if (payload.time !== undefined) user_seen.time = payload.time;
        if (payload.type !== undefined) user_seen.type = payload.type;
        user_seen
          .save({ transaction })
          .then((doc) => resolve(doc))
          .catch((error) => reject(error));
      } else {
        resolve(null);
      }
    });
  }

  /**
   * Delete  UserSeen
   *
   * @param {Object} query
   */
  static delete(query: any) {
    return new Promise((resolve, reject) => {
      UserSeen.destroy({ where: query })
        .then((result) => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

export default UserSeenDAL;
