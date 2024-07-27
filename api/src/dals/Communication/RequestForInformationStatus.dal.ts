import { Transaction } from "sequelize/types";
import { RequestForInformationStatus } from "../../models/Communication/RequestForInformationStatus.model";
import { Document } from "../../models/Document";
class RequestForInformationStatusDAL {
  /**
   * Create RequestForInformationStatus
   *
   * @param {RequestForInformationStatus} request_for_information_status
   * @param {Transaction} transaction
   */
  static create(
    request_for_information_status: any,
    transaction?: Transaction
  ): Promise<RequestForInformationStatus> {
    return new Promise((resolve, reject) => {
      console.log('dallllllllllllllllllllll');
      RequestForInformationStatus.create(request_for_information_status, {
        transaction: transaction,
      })
        .then((result) => resolve(result))
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Find Many RequestForInformationStatus
   *
   * @param {any} query
   */
  static findMany(query: any) {
    console.log({ query });
    return new Promise((resolve, reject) => {
      RequestForInformationStatus.findAll({
        where: query,
        include: [
          Document,
        ],
      })
        .then((result) => resolve(result))
        .catch((error) => {
          console.log('daldaladallllllllllllllllllllllllll', error);
          reject(error)

        });
    });
  }

  /**
   * Find One RequestForInformationStatus
   *
   * @param {any} query
   */
  static findOne(query: any) {
    return new Promise((resolve, reject) => {
      RequestForInformationStatus.findOne({
        where: query,
        include: [],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One RequestForInformationStatus
   *
   * @param {any} query
   */
  static findId(query: any) {
    return new Promise((resolve, reject) => {
      RequestForInformationStatus.findOne({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Update RequestForInformationStatus
   * @param {RequestForInformationStatus} request_for_information_status
   * @param {Object} payload
   */
  static update(
    request_for_information_status: RequestForInformationStatus,
    payload: RequestForInformationStatus,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      if (request_for_information_status) {
        if (payload.request_for_information_id) request_for_information_status.request_for_information_id = payload.request_for_information_id;
        if (payload.project_id) request_for_information_status.project_id = payload.project_id;
        if (payload.document_id) request_for_information_status.document_id = payload.document_id;
        if (payload.from) request_for_information_status.from = payload.from;
        if (payload.status) request_for_information_status.status = payload.status;
        if (payload.message) request_for_information_status.message = payload.message;
        if (payload.date) request_for_information_status.date = payload.date;
        if (payload.user_id) request_for_information_status.user_id = payload.user_id;

        request_for_information_status
          .save({ transaction })
          .then((doc) => resolve(doc))
          .catch((error) => reject(error));
      } else {
        resolve(null);
      }
    });
  }

  /**
   * Delete RequestForInformationStatus
   *
   * @param {Object} query
   */
  static delete(query: any) {
    return new Promise((resolve, reject) => {
      RequestForInformationStatus.destroy({ where: query })
        .then((result) => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

export default RequestForInformationStatusDAL;
