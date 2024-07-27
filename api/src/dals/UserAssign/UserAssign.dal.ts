import { Transaction } from "sequelize/types";
import { UserAssign } from "../../models/UserAssign/UserAssign.model";
import {
  getPagingData,
  PagedData,
} from "../../utilities/Pagination/Pagination";

class UserAssignDAL {
  /**
   * Create  UserAssign
   *
   * @param {UserAssign}  user_assign
   * @param {Transaction} transaction
   */
  static create(user_assign: any, transaction?: Transaction): Promise<UserAssign> {
    return new Promise((resolve, reject) => {
      UserAssign.create(user_assign, {
        transaction: transaction,
      })
        .then((result) => resolve(result))
        .catch((error) => {
          reject(error);
        });
    });
  }
  /**
   * Create  UserAssign
   *
   * @param {UserAssign}  user_assign
   * @param {Transaction} transaction
   */
  static createBulk(user_assign: any, transaction?: Transaction): Promise<UserAssign> {
    return new Promise((resolve, reject) => {
      console.log(UserAssign);
      UserAssign.bulkCreate(user_assign, {
        transaction: transaction,
      })
        .then((result: any) => {
          console.log("response", result)
          resolve(result)
        })
        .catch((error) => {
          console.log(">>>>>>>>>>>>>>>", error);
          reject(error);
        });
    });
  }


  /**
   * Find Many  UserAssign
   *
   * @param {any} query
   */
  static findMany(query: any): Promise<UserAssign[]> {
    return new Promise((resolve, reject) => {
      UserAssign.findAll({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find Paged  UserAssign
   *
   * @param {any} query
   */
  static findPaged(query: any) {
    const { where, limit, offset } = query;
    return new Promise<PagedData<UserAssign[]>>((resolve, reject) => {
      UserAssign.findAndCountAll({
        where,
        limit: limit,
        offset: offset,
      })
        .then((result) => resolve(getPagingData(result, offset, limit)))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One  UserAssign
   *
   * @param {any} query
   */
  static findOne(query: any) {
    return new Promise((resolve, reject) => {
      UserAssign.findOne({
        where: query,
        include: [],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One  UserAssign
   *
   * @param {any} query
   */
  static findId(query: any) {
    return new Promise((resolve, reject) => {
      UserAssign.findOne({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Update  UserAssign
   * @param { UserAssign} user_assign
   * @param {Object} payload
   */
  static update(
    user_assign: UserAssign,
    payload: Partial<UserAssign>,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      if (user_assign) {
        if (payload.assigned_id !== undefined) user_assign.assigned_id = payload.assigned_id;

        if (payload.project_id !== undefined)
          user_assign.project_id = payload.project_id;
        user_assign
          .save({ transaction })
          .then((doc) => resolve(doc))
          .catch((error) => reject(error));
      } else {
        resolve(null);
      }
    });
  }

  /**
   * Delete  UserAssign
   *
   * @param {Object} query
   */
  static delete(query: any) {
    return new Promise((resolve, reject) => {
      UserAssign.destroy({ where: query })
        .then((result) => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

export default UserAssignDAL;
