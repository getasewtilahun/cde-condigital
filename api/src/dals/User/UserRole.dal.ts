import { UserAccess, UserRole } from "../../models/User";
import { Transaction } from "sequelize/types";
import {
  getPagingData,
  PagedData,
} from "../../utilities/Pagination/Pagination";

class UserRoleDAL {
  /**
   * Create  UserRole
   *
   * @param {UserRole}  user
   * @param {Transaction} transaction
   */
  static create(user: any, transaction?: Transaction): Promise<UserRole> {
    return new Promise((resolve, reject) => {
      UserRole.create(user, {
        transaction: transaction,
      })
        .then((result) => resolve(result))
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Find Many  UserRole
   *
   * @param {any} query
   */
  static findMany(query: any): Promise<UserRole[]> {
    return new Promise((resolve, reject) => {
      UserRole.findAll({
        where: query,
        include: [UserAccess],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find Paged  UserRole
   *
   * @param {any} query
   */
  static findPaged(query: any) {
    const { where, limit, offset } = query;
    return new Promise<PagedData<UserRole[]>>((resolve, reject) => {
      UserRole.findAndCountAll({
        where,
        limit: limit,
        offset: offset,
      })
        .then((result) => resolve(getPagingData(result, offset, limit)))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One  UserRole
   *
   * @param {any} query
   */
  static findOne(query: any) {
    return new Promise((resolve, reject) => {
      UserRole.findOne({
        where: query,
        include: [UserAccess],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One  UserRole
   *
   * @param {any} query
   */
  static findId(query: any) {
    return new Promise((resolve, reject) => {
      UserRole.findOne({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Update  UserRole
   * @param { UserRole} user
   * @param {Object} payload
   */
  static update(
    user: UserRole,
    payload: Partial<UserRole>,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      if (user) {
        if (payload.name !== undefined) user.name = payload.name;

        user
          .save({ transaction })
          .then((doc) => resolve(doc))
          .catch((error) => reject(error));
      } else {
        resolve(null);
      }
    });
  }

  /**
   * Delete  UserRole
   *
   * @param {Object} query
   */
  static delete(query: any) {
    return new Promise((resolve, reject) => {
      UserRole.destroy({ where: query })
        .then((result) => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

export default UserRoleDAL;
