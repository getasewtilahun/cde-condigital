import {
  InternalServerError,
  BadRequestError,
  NotFoundError,
} from "../../errors/Errors";
import async from "async";
import { Transaction } from "sequelize/types";
import UserSeenDAL from "../../dals/User/UserSeen.dal";
import { UserSeen } from "../../models/User/UserSeen.model";

class UserSeenService {
  /**
   * Create  UserSeen
   *
   * @param {UserSeen} user_seen
   * @param {Transaction} transaction
   */

  static create(payload: UserSeen): Promise<any> {
    return new Promise((resolve, reject) => {
      async.waterfall([
        (done: Function) => {
          UserSeenDAL.findOne({ type: payload.type, user_id: payload.user_id })
            .then((result) => done(null, result))
            .catch((error) => done(new InternalServerError(error)));
        },
        (user_seen: UserSeen | null) => {
          if (user_seen)
            this.update(user_seen.id, { time: Date.now() })
              .then((result) => resolve(result))
              .catch((error) => reject(error));
          else
            UserSeenDAL.create({ ...payload, time: Date.now() })
              .then((result) => resolve(result))
              .catch((error) => reject(new InternalServerError(error)));
        },
      ]);
    });
  }

  /**
   * Find All UserSeen
   *
   * @param {string} term
   *
   * @returns {Promise<UserSeen[]>}
   */
  public static findAll(query: any): Promise<UserSeen[]> {
    return new Promise((resolve, reject) => {
      UserSeenDAL.findMany(query)
        .then((user: any) => {
          resolve(user);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find Paged UserSeen
   *
   * @param {string} query
   *
   * @returns {Promise<UserSeen[]>}
   */
  public static findPaged(query: any) {
    return new Promise((resolve, reject) => {
      UserSeenDAL.findPaged(query)
        .then((result) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find UserSeen By ID
   *
   * @param {string} id
   */
  public static findByID(id: string): Promise<UserSeen> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      UserSeenDAL.findOne(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * update UserSeen
   * @param {int} id
   * @param {UserSeen} payload
   */
  static update(
    id: number,
    payload: Partial<UserSeen>,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            UserSeenDAL.findOne({ id: id })
              .then((user_seen) => {
                if (user_seen) {
                  done(null, user_seen);
                } else {
                  done(new NotFoundError("Material Major Category Not Found"));
                }
              })
              .catch((error) => done(new InternalServerError(error)));
          },
          (user_seen: UserSeen, done: Function) => {
            UserSeenDAL.update(user_seen, payload, transaction)
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
   * Delete UserSeen By ID
   *
   * @param {string} id
   */
  public static delete(id: string): Promise<UserSeen> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      UserSeenDAL.delete(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }
}

export default UserSeenService;
