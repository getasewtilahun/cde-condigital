import async from "async";
import moment from "moment";
import { Transaction } from "sequelize/types";
import CommunicationGroupDAL from "../../dals/Communication/CommunicationGroup.dal";
import CommunicationGroupUserDAL from "../../dals/Communication/CommunicationGroupUser.dal";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../../errors/Errors";
import { CommunicationGroupUser } from "../../models/Communication/CommunicationGroupUser";
import { User } from "../../models/User";
import {
  CommunicationGroup,
  createTransaction,
} from "../../utilities/database/sequelize";

class CommunicationGroupService {
  /**
   * Create CommunicationGroup
   *
   * @param {CommunicationGroup} communicationGroup
   * @param {Transaction} transaction
   */
  static create(
    communicationGroup: any,
    transaction?: Transaction
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            createTransaction()
              .then((transaction) => done(null, transaction))
              .catch((error) => reject(new InternalServerError(error)));
          },
          (transaction: Transaction, done: Function) => {
            CommunicationGroupDAL.create(communicationGroup, transaction)
              .then((result) => done(null, transaction, result))
              .catch((error) =>
                done(new InternalServerError(error), transaction)
              );
          },
          (
            transaction: Transaction,
            createdCommunicationGroup: CommunicationGroup,
            done: Function
          ) => {
            CommunicationGroupUserDAL.create(
              {
                communication_group_id: createdCommunicationGroup.id,
                user_id: communicationGroup.user_id,
              },
              transaction
            )
              .then(() => done(null, transaction))
              .catch((error) =>
                done(new InternalServerError(error), transaction)
              );
          },
        ],
        (error, transaction: any) => {
          if (error) {
            console.log(error);
            transaction.rollback();
            reject(error);
          } else {
            transaction.commit();
            resolve(true);
          }
        }
      );
    });
  }

  /**
   * Find All CommunicationGroup
   *
   * @param {User} user
   *
   * @returns {Promise<CommunicationGroup[]>}
   */
  public static findAll(user: User): Promise<CommunicationGroup[]> {
    return new Promise((resolve, reject) => {
      if (user.is_super_user) {
        CommunicationGroupDAL.findMany({})
          .then((result: any) => {
            resolve(result);
          })
          .catch((error: any) => {
            reject(new InternalServerError(error));
          });
      } else {
        CommunicationGroupDAL.findMyGroups(user)
          .then((result: any) => {
            resolve(result);
          })
          .catch((error: any) => {
            reject(new InternalServerError(error));
          });
      }
    });
  }

  /**
   * Find CommunicationGroup By ID
   *
   * @param {string} query
   */
  public static findAllUsers(query: any): Promise<CommunicationGroupUser[]> {
    return new Promise((resolve, reject) => {
      CommunicationGroupUserDAL.findMany(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * update CommunicationGroup
   * @param {int} id
   * @param {CommunicationGroup} payload
   */
  static update(
    id: number,
    payload: CommunicationGroup,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            CommunicationGroupDAL.findOne({ id: id })
              .then((communicationGroup) => {
                if (communicationGroup) {
                  done(null, communicationGroup);
                } else {
                  done(new NotFoundError("Group Not Found"));
                }
              })
              .catch((error) => done(new InternalServerError(error)));
          },
          (communicationGroup: CommunicationGroup, done: Function) => {
            CommunicationGroupDAL.update(
              communicationGroup,
              payload,
              transaction
            )
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
   * Create CommunicationGroup
   *
   * @param {Partial<CommunicationGroupUser>[]} communicationGroupUsers[]
   * @param {Transaction} transaction
   */
  static updateGroupMembers(
    communicationGroupUsers: Partial<CommunicationGroupUser>[],
    transaction?: Transaction
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            createTransaction()
              .then((transaction) => done(null, transaction))
              .catch((error) => reject(new InternalServerError(error)));
          },
          (transaction: Transaction, done: Function) => {
            async.eachSeries(
              communicationGroupUsers,
              (item: any, callback) => {
                if (item.deleted) {
                  CommunicationGroupUserDAL.delete({ id: item.id }, transaction)
                    .then(() => callback())
                    .catch((error) => callback(new InternalServerError(error)));
                } else {
                  CommunicationGroupUserDAL.upsert(item, transaction)
                    .then(() => callback())
                    .catch((error) => callback(error));
                }
              },
              (error: any) => {
                error ? done(error, transaction) : done(null, transaction);
              }
            );
          },
        ],
        (error, transaction: any) => {
          if (error) {
            console.log(error);
            transaction.rollback();
            reject(error);
          } else {
            transaction.commit();
            resolve(true);
          }
        }
      );
    });
  }

  /**
   * update CommunicationGroupUser Last seen
   *
   * @param {CommunicationGroup} payload
   */
  static updateLastSeen(payload: any) {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            CommunicationGroupUserDAL.findOne({
              communication_group_id: payload.communication_group_id,
              user_id: payload.user_id,
            })
              .then((result) => {
                done(null, result);
              })
              .catch((error) => reject(new InternalServerError(error)));
          },
          (communicationGroupUser: CommunicationGroupUser, done: Function) => {
            if (communicationGroupUser) {
              if (
                moment(communicationGroupUser.last_seen).isBefore(
                  moment(payload.last_seen)
                )
              )
                CommunicationGroupUserDAL.update(communicationGroupUser, {
                  communication_group_id: payload.communication_group_id,
                  user_id: payload.user_id,
                  last_seen: payload.last_seen,
                })
                  .then((result) => resolve(result))
                  .catch((error) => reject(new InternalServerError(error)));
              else resolve(true);
            } else {
              CommunicationGroupUserDAL.create({
                communication_group_id: payload.communication_group_id,
                user_id: payload.user_id,
                last_seen: payload.last_seen,
              })
                .then((result) => resolve(result))
                .catch((error) => reject(new InternalServerError(error)));
            }
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

  /**
   * Delete CommunicationGroup By ID
   *
   * @param {string} id
   */
  public static delete(id: string): Promise<CommunicationGroup> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      CommunicationGroupDAL.delete(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }
}

export default CommunicationGroupService;
