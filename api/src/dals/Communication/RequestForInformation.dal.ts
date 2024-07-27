import { Transaction } from "sequelize/types";
import { RequestForInformation } from "../../models/Communication/RequestForInformation.model";
import { Document } from "../../models/Document";
import { RequestForInformationStatus } from "../../models/Communication/RequestForInformationStatus.model";
class RequestForInformationDAL {
  /**
   * Create RequestForInformation
   *
   * @param {RequestForInformation} request_for_information
   * @param {Transaction} transaction
   */
  static create(
    request_for_information: any,
    transaction?: Transaction
  ): Promise<RequestForInformation> {
    return new Promise((resolve, reject) => {

      console.log('dallllllllllllllllllllll');
      RequestForInformation.create(request_for_information, {
        transaction: transaction,
      })
        .then((result) => resolve(result))
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Find Many RequestForInformation
   *
   * @param {any} query
   */
  static findMany(query: any) {
    console.log({ query });
    return new Promise((resolve, reject) => {
      RequestForInformation.findAll({
        where: query,
        include: [
          Document,
          RequestForInformationStatus,
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
   * Find One RequestForInformation
   *
   * @param {any} query
   */
  static findOne(query: any) {
    return new Promise((resolve, reject) => {
      RequestForInformation.findOne({
        where: query,
        include: [
        ],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One RequestForInformation
   *
   * @param {any} query
   */
  static findId(query: any) {
    return new Promise((resolve, reject) => {
      RequestForInformation.findOne({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Update RequestForInformation
   * @param {RequestForInformation} request_for_information
   * @param {Object} payload
   */
  static update(
    request_for_information: RequestForInformation,
    payload: RequestForInformation,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      if (request_for_information) {
        if (payload.date) request_for_information.date = payload.date;
        if (payload.project_id) request_for_information.project_id = payload.project_id;
        if (payload.document_id) request_for_information.document_id = payload.document_id;
        if (payload.document_assignment_id) request_for_information.document_assignment_id = payload.document_assignment_id;
        if (payload.subject) request_for_information.subject = payload.subject;
        if (payload.status) request_for_information.status = payload.status;
        if (payload.description) request_for_information.description = payload.description;
        if (payload.document_name) request_for_information.document_name = payload.document_name;
        if (payload.reference_no) request_for_information.reference_no = payload.reference_no;
        if (payload.considered_doc_id) request_for_information.considered_doc_id = payload.considered_doc_id;
        if (payload.from) request_for_information.from = payload.from;
        if (payload.assigned_to) request_for_information.assigned_to = payload.assigned_to;
        if (payload.cc) request_for_information.cc = payload.cc;
        if (payload.user_id) request_for_information.user_id = payload.user_id;
        if (payload.message) request_for_information.message = payload.message;

        request_for_information
          .save({ transaction })
          .then((doc) => resolve(doc))
          .catch((error) => reject(error));
      } else {
        resolve(null);
      }
    });
  }

  /**
   * Delete RequestForInformation
   *
   * @param {Object} query
   */
  static delete(query: any) {
    return new Promise((resolve, reject) => {
      RequestForInformation.destroy({ where: query })
        .then((result) => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

export default RequestForInformationDAL;
