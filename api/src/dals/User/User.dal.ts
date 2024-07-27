import { Op } from "sequelize";
import { Transaction } from "sequelize/types";
import { User } from "../../models/User/User.model";
import { UserAccess } from "../../models/User/UserAccess.model";
import { UserRole } from "../../models/User/UserRole.model";
import { isNil } from "lodash";
import { UserStatus } from "../../constants/constants";
class UserDAL {
  static create(payload: User, transaction: Transaction): Promise<User> {
    return new Promise((resolve, reject) => {
      User.create(
        {
          ...payload,
        },
        { transaction: transaction }
      )
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find Many User
   *
   * @param {any} query
   */
  static findMany(query: any): Promise<User[]> {
    const formattedQuery = { ...query };
    if (!isNil(formattedQuery.key)) {
      formattedQuery.full_name = {
        [Op.like]: `%${query.key}%`,
      };
      delete formattedQuery.key;
    }
    return new Promise((resolve, reject) => {
      User.findAll({
        where: formattedQuery,
        include: [UserRole],
      })
        .then((result) => resolve(result))
        .catch((error) => {
          console.log({ error });
          reject(error);
        });
    });
  }

  static findManyList(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      User.findAll()
        .then((result) => resolve(result))
        .catch((error) => {
          console.log({ error });
          reject(error);
        });
    });
  }

  static findManyQueriedList(query: any): Promise<User[]> {
    return new Promise((resolve, reject) => {
      User.findAll({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => {
          console.log({ error });
          reject(error);
        });
    });
  }

  /**
   * Find One User
   *
   * @param {any} query
   */
  static findOne(query: any): Promise<User | null> {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: query,
        include: [
          {
            model: UserRole,
            include: [UserAccess],
          },
        ],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One User
   *
   * @param {any} query
   */
  static findByFeature(query: any): Promise<User[]> {
    return new Promise((resolve, reject) => {
      User.findAll({
        where: query,
        include: [
          {
            model: UserRole,
            include: [UserAccess],
          },
        ],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One User
   *
   * @param {any} query
   */
  static findByEmail(value: any) {
    return new Promise((resolve, reject) => {
      User.findOne({
        include: [
          {
            model: UserRole,
            include: [UserAccess],
          },
        ],
        where: { email: value, status: UserStatus.ACTIVATED },
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Update User
   * @param {User} user
   * @param {Object} payload
   */
  static update(user: User, payload: any, transaction?: Transaction) {
    return new Promise((resolve, reject) => {
      if (user) {
        if (payload.full_name) user.full_name = payload.full_name;
        if (payload.email) user.email = payload.email;
        if (payload.phone_number) user.phone_number = payload.phone_number;
        if (payload.password) user.password = payload.password;
        if (payload.organization) user.organization = payload.organization;
        if (payload.role_id !== undefined) user.role_id = payload.role_id;
        if (payload.status) user.status = payload.status;
        if (payload.chat_id) user.chat_id = payload.chat_id;
        if (payload.is_super_user !== undefined)
          user.is_super_user = payload.is_super_user;


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
   * Delete User
   *
   * @param {Object} query
   */
  static delete(query: any) {
    return new Promise((resolve, reject) => {
      User.destroy({ where: query })
        .then((result) => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

export default UserDAL;
