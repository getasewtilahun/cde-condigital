import async from "async";
import { isNil, reject, result, startsWith, toNumber, uniq } from "lodash";
import moment, { unitOfTime } from "moment";
import { Op } from "sequelize";
import { Transaction } from "sequelize/types";
import { createTransaction } from "../../utilities/database/sequelize";
import { InternalServerError, NotFoundError } from "../../errors/Errors";
import { UserDAL } from "../../dals/User";
import { User } from "../../models/User";
import { sendMessage } from "../../utilities/TelegramBot/notification.util";

class NotificationBotService {
  /**
   * Verify bot activation request
   *
   * @param {string} activationKey
   * @param {string} chat_id
   */
  public static verify(activationKey: string, chat_id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            createTransaction()
              .then((transaction) => done(null, transaction))
              .catch((error) => reject(new InternalServerError(error)));
          },
          (transaction: Transaction, done: Function) => {
            UserDAL.findOne({ chat_id: activationKey })
              .then((user) =>
                user
                  ? done(null, transaction, user)
                  : done(new NotFoundError("User not found"), transaction)
              )
              .catch((error) => {
                done(new InternalServerError(error), transaction);
              });
          },
          (transaction: Transaction, user: User, done: Function) => {
            user.chat_id = chat_id;
            UserDAL.update(user, user, transaction)
              .then((user) => done(null, transaction, user))
              .catch((error) => {
                done(new InternalServerError(error), transaction);
              });
          },
        ],
        (error, transaction: any) => {
          if (error) {
            reject(error);
            transaction.rollback();
          } else {
            transaction.commit();
            resolve(true);
          }
        }
      );
    });
  }

  public static sendNotificationMessage(
    from_user_id: number,
    to_user_id: number,
    message: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            UserDAL.findMany({
              id: {
                [Op.or]: [from_user_id, to_user_id],
              },
            })
              .then((users) => {
                let from: any = null;
                let to: any = null;
                users.forEach((user) => {
                  if (user.id === toNumber(from_user_id)) from = user;
                  if (user.id === toNumber(to_user_id)) to = user;
                });
                if (to && from) done(null, to, from);
                else done(new NotFoundError("User Not Found"));
              })
              .catch((error) => done(new InternalServerError(error)));
          },
          (to: User, from: User, done: Function) => {
            if (!isNil(to?.chat_id) && !to.chat_id.startsWith("_")) {
              console.log(
                `NOTIFICATION ⏰ \n\nHello ${to.full_name}, ${from.full_name} ${message}`
              );
              sendMessage(
                toNumber(to.chat_id),
                `NOTIFICATION ⏰ \n\nHello ${to.full_name}, ${from.full_name} ${message}`
              )
                .then(() => done())
                .catch((error) => done(new InternalServerError(error)));
            } else {
              done();
            }
          },
        ],
        (error) => {
          if (error) reject(error);
          else resolve(true);
        }
      );
    });
  }
}

export default NotificationBotService;
