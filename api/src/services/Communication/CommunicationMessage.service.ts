import async from "async";
import { Op } from "sequelize";
import { Transaction } from "sequelize/types";
import { socketIo } from "../../app";
import { CommunicationSocketEvents } from "../../constants/constants";
import CommunicationMessageDAL from "../../dals/Communication/CommunicationMessage.dal";
import UserDAL from "../../dals/User/User.dal";
import {
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../../errors/Errors";
import { CommunicationMessage } from "../../utilities/database/sequelize";
import { PagedData } from "../../utilities/Pagination/Pagination";

class CommunicationMessageService {
  /**
   * Create CommunicationMessage
   *
   * @param {CommunicationMessage} communicationMessage
   * @param {Transaction} transaction
   */
  static create(
    communicationMessage: any,
    transaction?: Transaction
  ): Promise<CommunicationMessage> {
    return new Promise((resolve, reject) => {
      CommunicationMessageDAL.create(communicationMessage, transaction)
        .then((message_result) => {
          UserDAL.findOne({ id: communicationMessage.user_id })
            .then((user) => {
              if (user) {
                socketIo
                  .to(`ROOM:${message_result.communication_group_id}`)
                  .emit(CommunicationSocketEvents.NEW_MESSAGE, {
                    id: message_result.getDataValue("id"),
                    communication_group_id:
                      communicationMessage.communication_group_id,
                    user_id: communicationMessage.user_id,
                    text: communicationMessage.text,
                    document_url: communicationMessage.text,
                    date: communicationMessage.date,

                    user: {
                      id: user?.id,
                      full_name: user?.full_name,
                    },
                  });
              }

              resolve(message_result);
            })
            .catch((error) => resolve(message_result));
        })
        .catch((error) => reject(new InternalServerError(error)));
    });
  }

  /**
   * Find All CommunicationMessage
   *
   * @param {any} query
   *
   * @returns {Promise<CommunicationMessage[]>}
   */
  public static findAll(query: any): Promise<CommunicationMessage[]> {
    return new Promise((resolve, reject) => {
      CommunicationMessageDAL.findMany(query)
        .then((user: any) => {
          resolve(user);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find All CommunicationMessage
   *
   * @param {any} query
   *
   * @returns {Promise<CommunicationMessage[]>}
   */
  public static findPaged(
    query: any
  ): Promise<PagedData<CommunicationMessage[]>> {
    return new Promise((resolve, reject) => {
      let temp: any = { ...query };

      if (temp?.where?.start_date) {
        temp.where.date = {
          [Op.lt]: temp.where.start_date,
        };

        delete temp.where.start_date;
      }

      CommunicationMessageDAL.findPaged(temp)
        .then((result) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find All CommunicationMessage
   *
   * @param {any} query
   *
   * @returns {Promise<CommunicationMessage[]>}
   */
  public static search(query: any): Promise<PagedData<CommunicationMessage[]>> {
    return new Promise((resolve, reject) => {
      let temp: any = { ...query };

      CommunicationMessageDAL.fullTextSearch(temp)
        .then((result) => {
          resolve(result);
        })
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find CommunicationMessage By ID
   *
   * @param {string} id
   */
  public static findByID(id: string): Promise<CommunicationMessage> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      CommunicationMessageDAL.findOne(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * update CommunicationMessage
   * @param {int} id
   * @param {CommunicationMessage} payload
   */
  static update(
    id: number,
    payload: CommunicationMessage,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            CommunicationMessageDAL.findOne({ id: id })
              .then((communicationMessage) => {
                if (communicationMessage) {
                  done(null, communicationMessage);
                } else {
                  done(new NotFoundError("Message Not Found"));
                }
              })
              .catch((error) => done(new InternalServerError(error)));
          },
          (communicationMessage: CommunicationMessage, done: Function) => {
            CommunicationMessageDAL.update(
              communicationMessage,
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
   * Delete CommunicationMessage By ID
   *
   * @param {string} id
   */
  public static delete(id: string): Promise<CommunicationMessage> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      CommunicationMessageDAL.delete(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }
}

export default CommunicationMessageService;
