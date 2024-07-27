import { Transaction } from "sequelize/types";
import { Sequelize } from "sequelize";
import { CommunicationMessage } from "../../models/Communication/CommunicationMessage";
import { User } from "../../models/User";
import { getPagingData, PagedData } from "../../utilities/Pagination/Pagination";

class CommunicationMessageDAL {
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
      CommunicationMessage.create(communicationMessage, { transaction })
        .then((result) => resolve(result))
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Find Many CommunicationMessage
   *
   * @param {any} query
   */
  static findMany(query: any) {
    return new Promise((resolve, reject) => {
      CommunicationMessage.findAll({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find Paged  FixedAssetIn
   *
   * @param {any} query
   */
  static findPaged(query: any) {
    const { where, limit, offset } = query;
    return new Promise<PagedData<CommunicationMessage[]>>((resolve, reject) => {
      CommunicationMessage.findAndCountAll({
        order: [["date", "DESC"]],
        where,
        limit: limit,
        offset: offset,
        include: [{ model: User, attributes: ["id", "full_name"] }],
      })
        .then((result) => resolve(getPagingData(result, offset, limit)))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find Paged  FixedAssetIn
   *
   * @param {any} query
   */
  static fullTextSearch(query: any) {
    const { communication_group_id, search, limit, offset } = query;
    return new Promise<PagedData<CommunicationMessage[]>>((resolve, reject) => {
      CommunicationMessage.findAndCountAll({
        where: Sequelize.literal(
          "communication_group_id=:communication_group_id AND (MATCH (text) AGAINST (:search) OR MATCH (document_url) AGAINST (:search)) collate latin1_bin"
        ),
        replacements: {
          search,
          communication_group_id,
        },
        order: [["date", "DESC"]],
        limit: limit,
        offset: offset,
        include: [{ model: User, attributes: ["id", "full_name"] }],
      })
        .then((result) => resolve(getPagingData(result, offset, limit)))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One CommunicationMessage
   *
   * @param {any} query
   */
  static findOne(query: any) {
    return new Promise((resolve, reject) => {
      CommunicationMessage.findOne({
        where: query,
        include: [],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One CommunicationMessage
   *
   * @param {any} query
   */
  static findId(query: any) {
    return new Promise((resolve, reject) => {
      CommunicationMessage.findOne({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Update CommunicationMessage
   * @param {CommunicationMessage} communicationMessage
   * @param {Object} payload
   */
  static update(
    communicationMessage: CommunicationMessage,
    payload: CommunicationMessage,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      if (communicationMessage) {
        if (payload.text) communicationMessage.text = payload.text;
        if (payload.document_url)
          communicationMessage.document_url = payload.document_url;
        if (payload.date) communicationMessage.date = payload.date;

        communicationMessage
          .save({ transaction })
          .then((result) => resolve(result))
          .catch((error) => reject(error));
      } else {
        resolve(null);
      }
    });
  }

  /**
   * Delete CommunicationMessage
   *
   * @param {Object} query
   */
  static delete(query: any, transaction?: Transaction) {
    return new Promise((resolve, reject) => {
      CommunicationMessage.destroy({ where: query, transaction })
        .then((result) => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

export default CommunicationMessageDAL;
