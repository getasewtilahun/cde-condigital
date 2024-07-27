import moment from "moment";
import { Transaction } from "sequelize/types";
import { Op } from "sequelize";

import { CommunicationGroup } from "../../models/Communication/CommunicationGroup";
import { CommunicationGroupUser } from "../../models/Communication/CommunicationGroupUser";

import { CommunicationMessage, User } from "../../utilities/database/sequelize";

class CommunicationGroupDAL {
  /**
   * Create CommunicationGroup
   *
   * @param {CommunicationGroup} communicationGroup
   * @param {Transaction} transaction
   */
  static create(
    communicationGroup: any,
    transaction?: Transaction
  ): Promise<CommunicationGroup> {
    return new Promise((resolve, reject) => {
      CommunicationGroup.create(communicationGroup, { transaction })
        .then((result) => resolve(result))
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Find Many CommunicationGroup
   *
   * @param {any} user
   */
  static findMyGroups(user: User) {
    return new Promise(async (resolve, reject) => {
      CommunicationGroup.findAll({
        include: [
          {
            model: CommunicationGroupUser,
            where: {
              user_id: user.id,
            },
            required: true,
            include: [
              {
                model: User,
                attributes: ["id", "full_name"],
              },
            ],
          },
          {
            model: CommunicationMessage,
            attributes: ["id", "date"],
          },
        ],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));

      // const query =
      //   "SELECT `communication_group`.`id`, `communication_group`.`name`, `communication_group`.`createdAt`, `communication_group`.`updatedAt`, COUNT(`text`) AS `unseen_messages`, `communication_group_users`.`last_seen` AS `last_seen` FROM `communication_groups` AS `communication_group` LEFT OUTER JOIN `communication_group_users` AS `communication_group_users` ON `communication_group`.`id` = `communication_group_users`.`communication_group_id` LEFT OUTER JOIN `communication_messages` AS `communication_messages` ON `communication_group`.`id` = `communication_messages`.`communication_group_id` WHERE `communication_group_users`.`user_id` = :user_id AND `communication_messages`.`date` < `communication_group_users`.last_seen;";

      // sequelize
      //   .query(query, {
      //     replacements: {
      //       user_id: user.id,
      //     },
      //     type: QueryTypes.SELECT,
      //     model: CommunicationGroup,
      //     mapToModel: true,
      //   })
      //   .then((result) => resolve(result))
      //   .catch((error) => reject(new InternalServerError(error)));
    });
  }

  /**
   * Find One CommunicationGroup
   *
   * @param {any} query
   */
  static findMany(query: any) {
    return new Promise((resolve, reject) => {
      CommunicationGroup.findAll({
        where: query,
        include: [
          {
            model: CommunicationGroupUser,
            include: [
              {
                model: User,
                attributes: ["id", "full_name"],
              },
            ],
          },
          {
            model: CommunicationMessage,
            attributes: ["id", "date"],
          },
        ],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One CommunicationGroup
   *
   * @param {any} query
   */
  static findManyUnseen(query: any) {
    return new Promise((resolve, reject) => {
      CommunicationGroup.findAll({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One CommunicationGroup
   *
   * @param {any} query
   */
  static findOne(query: any) {
    return new Promise((resolve, reject) => {
      CommunicationGroup.findOne({
        where: query,
        include: [
          {
            model: CommunicationGroupUser,
            include: [
              {
                model: User,
                attributes: ["id", "full_name", "chat_id"],
              },
            ],
          },
          {
            model: CommunicationMessage,
            attributes: ["id", "date"],
          },
        ],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One CommunicationGroup
   *
   * @param {any} query
   */
  static findId(query: any) {
    return new Promise((resolve, reject) => {
      CommunicationGroup.findOne({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Update CommunicationGroup
   * @param {CommunicationGroup} communicationGroup
   * @param {Object} payload
   */
  static update(
    communicationGroup: CommunicationGroup,
    payload: CommunicationGroup,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      if (communicationGroup) {
        if (payload.name) communicationGroup.name = payload.name;

        communicationGroup
          .save({ transaction })
          .then((result) => resolve(result))
          .catch((error) => reject(error));
      } else {
        resolve(null);
      }
    });
  }

  /**
   * Delete CommunicationGroup
   *
   * @param {Object} query
   */
  static delete(query: any, transaction?: Transaction) {
    return new Promise((resolve, reject) => {
      CommunicationGroup.destroy({ where: query, transaction })
        .then((result) => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

export default CommunicationGroupDAL;
