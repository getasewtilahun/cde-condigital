import { isNil, result } from "lodash";
import { Transaction } from "sequelize/types";
import { InternalServerError, NotFoundError } from "../../errors/Errors";
import { CommunicationGroupUser } from "../../models/Communication/CommunicationGroupUser";
import { User } from "../../models/User";

class CommunicationGroupUserDAL {
  /**
   * Create CommunicationGroupUser
   *
   * @param {CommunicationGroupUser} communicationGroupUser
   * @param {Transaction} transaction
   */
  static create(
    communicationGroupUser: any,
    transaction?: Transaction
  ): Promise<CommunicationGroupUser> {
    return new Promise((resolve, reject) => {
      CommunicationGroupUser.create(communicationGroupUser, { transaction })
        .then((result) => resolve(result))
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Create CommunicationGroupUser
   *
   * @param {CommunicationGroupUser} communicationGroupUser
   * @param {Transaction} transaction
   */
  static upsert(
    communicationGroupUser: any,
    transaction?: Transaction
  ): Promise<CommunicationGroupUser | null> {
    return new Promise((resolve, reject) => {
      if (!isNil(communicationGroupUser.id)) {
        this.findOne({ id: communicationGroupUser.id })
          .then((result) => {
            if (result) {
              this.update(result, communicationGroupUser)
                .then((result: any) => resolve(result))
                .catch((error) => reject(new InternalServerError(error)));
            } else {
              reject(new NotFoundError("Communication User Not Found"));
            }
          })
          .catch((error) => reject(new InternalServerError(error)));
      } else {
        CommunicationGroupUser.create(communicationGroupUser, { transaction })
          .then((result) => resolve(result))
          .catch((error) => {
            reject(new InternalServerError(error));
          });
      }
    });
  }

  /**
   * Find Many CommunicationGroupUser
   *
   * @param {any} query
   */
  static findMany(query: any) {
    return new Promise((resolve, reject) => {
      CommunicationGroupUser.findAll({
        where: query,
        include: [
          {
            model: User,
            attributes: ["id", "full_name"],
          },
        ],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One CommunicationGroupUser
   *
   * @param {any} query
   */
  static findOne(query: any): Promise<CommunicationGroupUser | null> {
    return new Promise((resolve, reject) => {
      CommunicationGroupUser.findOne({
        where: query,
        include: [],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Update CommunicationGroupUser
   * @param {CommunicationGroupUser} communicationGroupUser
   * @param {Object} payload
   */
  static update(
    communicationGroupUser: CommunicationGroupUser,
    payload: Partial<CommunicationGroupUser>,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      if (communicationGroupUser) {
        if (payload.last_seen)
          communicationGroupUser.last_seen = payload.last_seen;

        communicationGroupUser
          .save({ transaction })
          .then((result) => resolve(result))
          .catch((error) => reject(error));
      } else {
        resolve(null);
      }
    });
  }

  /**
   * Update CommunicationGroupUser
   * @param {CommunicationGroupUser} communicationGroupUser
   * @param {Object} payload
   */
  static updateWithQuery(
    payload: Partial<CommunicationGroupUser>,
    query: any,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      CommunicationGroupUser.update(payload, {
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Delete CommunicationGroupUser
   *
   * @param {Object} query
   */
  static delete(query: any, transaction?: Transaction) {
    return new Promise((resolve, reject) => {
      CommunicationGroupUser.destroy({ where: query, transaction })
        .then((result) => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

export default CommunicationGroupUserDAL;
