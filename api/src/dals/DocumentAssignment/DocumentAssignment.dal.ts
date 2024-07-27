import { Transaction } from "sequelize/types";
import { DocumentAssignment } from "../../models/DocumentAssignment/DocumentAssignment.model";
import { Document } from "../../models/Document";
import { DocumentStatus } from "../../models/DocumentAssignment";
class DocumentAssignmentDAL {
  /**
   * Create DocumentAssignment
   *
   * @param {DocumentAssignment} document_assignment
   * @param {Transaction} transaction
   */
  static create(
    document_assignment: any,
    transaction?: Transaction
  ): Promise<DocumentAssignment> {
    return new Promise((resolve, reject) => {

      console.log('dallllllllllllllllllllll');
      DocumentAssignment.create(document_assignment, {
        transaction: transaction,
      })
        .then((result) => resolve(result))
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Find Many DocumentAssignment
   *
   * @param {any} query
   */
  static findMany(query: any) {
    console.log({ query });
    return new Promise((resolve, reject) => {
      DocumentAssignment.findAll({
        where: query,
        include: [
          DocumentStatus,
          Document,
          //   // {
          //   //   model: UserAssignmentItem,
          //   //   attributes: ["id", "category", "description", "folder", "sub_folder"],
          //   // },
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
   * Find One DocumentAssignment
   *
   * @param {any} query
   */
  static findOne(query: any) {
    return new Promise((resolve, reject) => {
      DocumentAssignment.findOne({
        where: query,
        include: [],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One DocumentAssignment
   *
   * @param {any} query
   */
  static findId(query: any) {
    return new Promise((resolve, reject) => {
      DocumentAssignment.findOne({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Update DocumentAssignment
   * @param {DocumentAssignment} document_assignment
   * @param {Object} payload
   */
  static update(
    document_assignment: DocumentAssignment,
    payload: DocumentAssignment,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      if (document_assignment) {
        if (payload.date) document_assignment.date = payload.date;
        if (payload.action_by) document_assignment.action_by = payload.action_by;
        if (payload.author) document_assignment.author = payload.author;
        if (payload.document_id) document_assignment.document_id = payload.document_id;
        if (payload.document_name) document_assignment.document_name = payload.document_name;
        if (payload.type) document_assignment.type = payload.type;
        if (payload.sub_folder) document_assignment.sub_folder = payload.sub_folder;
        if (payload.status) document_assignment.status = payload.status;
        if (payload.statu_s) document_assignment.statu_s = payload.statu_s;
        if (payload.description) document_assignment.description = payload.description;
        if (payload.document_name) document_assignment.document_name = payload.document_name;
        if (payload.revision) document_assignment.revision = payload.revision;
        if (payload.version) document_assignment.version = payload.version;
        if (payload.originato_r) document_assignment.originato_r = payload.originato_r;
        if (payload.remark) document_assignment.remark = payload.remark;
        if (payload.classification) document_assignment.classification = payload.classification;
        if (payload.format) document_assignment.format = payload.format;

        document_assignment
          .save({ transaction })
          .then((doc) => resolve(doc))
          .catch((error) => reject(error));
      } else {
        resolve(null);
      }
    });
  }

  /**
   * Delete DocumentAssignment
   *
   * @param {Object} query
   */
  static delete(query: any) {
    return new Promise((resolve, reject) => {
      DocumentAssignment.destroy({ where: query })
        .then((result) => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

export default DocumentAssignmentDAL;
