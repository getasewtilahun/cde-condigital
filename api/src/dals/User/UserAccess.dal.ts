import { Transaction } from "sequelize/types";
import { UserAccess } from "../../models/User/UserAccess.model";
import {
  getPagingData,
  PagedData,
} from "../../utilities/Pagination/Pagination";

class UserAccessDAL {
  /**
   * Create  UserAccess
   *
   * @param {UserAccess}  user_access
   * @param {Transaction} transaction
   */
  static create(
    user_access: any,
    transaction?: Transaction
  ): Promise<UserAccess> {
    return new Promise((resolve, reject) => {
      UserAccess.create(user_access, {
        transaction: transaction,
      })
        .then((result) => resolve(result))
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Find Many  UserAccess
   *
   * @param {any} query
   */
  static findMany(query: any): Promise<UserAccess[]> {
    return new Promise((resolve, reject) => {
      UserAccess.findAll({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find Paged  UserAccess
   *
   * @param {any} query
   */
  static findPaged(query: any) {
    const { where, limit, offset } = query;
    return new Promise<PagedData<UserAccess[]>>((resolve, reject) => {
      UserAccess.findAndCountAll({
        where,
        limit: limit,
        offset: offset,
      })
        .then((result) => resolve(getPagingData(result, offset, limit)))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One  UserAccess
   *
   * @param {any} query
   */
  static findOne(query: any) {
    return new Promise((resolve, reject) => {
      UserAccess.findOne({
        where: query,
        include: [],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One  UserAccess
   *
   * @param {any} query
   */
  static findId(query: any) {
    return new Promise((resolve, reject) => {
      UserAccess.findOne({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Update  UserAccess
   * @param { UserAccess} user_access
   * @param {Object} payload
   */
  static update(
    user_access: UserAccess,
    payload: Partial<UserAccess>,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      if (user_access) {
        if (payload.feature !== undefined)
          user_access.feature = payload.feature;
        if (payload.write !== undefined) user_access.write = payload.write;
        if (payload.read !== undefined) user_access.read = payload.read;
        if (payload.edit !== undefined) user_access.edit = payload.edit;
        if (payload.delete !== undefined) user_access.delete = payload.delete;
        if (payload.approve !== undefined)
          user_access.approve = payload.approve;
        if (payload.check !== undefined) user_access.check = payload.check;
        if (payload.entry_special !== undefined) {
          user_access.entry_special = payload.entry_special;
        }
        if (payload.approve_special !== undefined)
          user_access.approve_special = payload.approve_special;

        user_access
          .save({ transaction })
          .then((doc) => resolve(doc))
          .catch((error) => reject(error));
      } else {
        resolve(null);
      }
    });
  }

  /**
   * Delete  UserAccess
   *
   * @param {Object} query
   */
  static delete(query: any) {
    return new Promise((resolve, reject) => {
      UserAccess.destroy({ where: query })
        .then((result) => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

export default UserAccessDAL;
