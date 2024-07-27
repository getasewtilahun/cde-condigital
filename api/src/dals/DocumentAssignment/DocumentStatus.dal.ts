import { Transaction } from "sequelize/types";
import { isNil } from "lodash";
import { DocumentStatus } from "../../models/DocumentAssignment/DocumentStatus.model";
class DocumentStatusDAL {
  /**
   * Create DocumentAssignment
   *
   * @param {DocumentStatus} document_status
   * @param {Transaction} transaction
   */
  static create(
    document_status: any,
    transaction?: Transaction
  ): Promise<DocumentStatus> {
    return new Promise((resolve, reject) => {
      DocumentStatus.create(document_status, {
        transaction: transaction,
      })
        .then((result) => resolve(result))
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Find Many DocumentStatus
   *
   * @param {any} query
   */
  static findMany(query: any) {
    return new Promise((resolve, reject) => {
      DocumentStatus.findAll({
        where: query,
        include: [],
      })
        .then((result) => resolve(result))
        .catch((error) => {
          reject(error)

        });
    });
  }

  /**
   * Find One DocumentStatus
   *
   * @param {any} query
   */
  static findOne(query: any) {
    return new Promise((resolve, reject) => {
      DocumentStatus.findOne({
        where: query,
        include: [],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One DocumentStatus
   *
   * @param {any} query
   */
  static findId(query: any) {
    return new Promise((resolve, reject) => {
      DocumentStatus.findOne({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Update DocumentStatus
   * @param {DocumentStatus} document_status
   * @param {Object} payload
   */
  static update(
    document_status: DocumentStatus,
    payload: DocumentStatus,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      if (document_status) {
        if (payload.document_assignment_id) document_status.document_assignment_id = payload.document_assignment_id;
        if (payload.revision) document_status.revision = payload.revision;
        if (payload.reviewed_by) document_status.reviewed_by = payload.reviewed_by;
        if (payload.authorized_by) document_status.authorized_by = payload.authorized_by;
        if (payload.type_on_status) document_status.type_on_status = payload.type_on_status;
        if (payload.approved_by) document_status.approved_by = payload.approved_by;
        if (payload.accepted_by) document_status.accepted_by = payload.accepted_by;
        if (payload.current_status) document_status.current_status = payload.current_status;
        if (payload.comment) document_status.comment = payload.comment;
        if (payload.requested_status) document_status.requested_status = payload.requested_status;
        if (payload.action_status) document_status.action_status = payload.action_status;

        document_status.save({ transaction })
          .then((doc) => {
            console.log("doc", doc);
            resolve(doc)
          })
          .catch((error) => {
            console.log("Error Occured", error);
            reject(error);
          });

      } else {
        resolve(null);
      }
    });
  }

  /**
   * Delete DocumentStatus
   *
   * @param {Object} query
   */
  static delete(query: any) {
    return new Promise((resolve, reject) => {
      DocumentStatus.destroy({ where: query })
        .then((result) => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

export default DocumentStatusDAL;
