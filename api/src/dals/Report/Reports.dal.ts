import { Transaction } from "sequelize/types";
import { Report } from "../../models/Report/Report.model";
import { Document } from "../../models/Document";
class ReportDAL {
  /**
   * Create Report
   *
   * @param {Report} report
   * @param {Transaction} transaction
   */
  static create(
    report: any,
    transaction?: Transaction
  ): Promise<Report> {
    return new Promise((resolve, reject) => {

      console.log('dallllllllllllllllllllll');
      Report.create(report, {
        transaction: transaction,
      })
        .then((result) => resolve(result))
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Find Many Report
   *
   * @param {any} query
   */
  static findMany(query: any) {
    console.log({ query });
    return new Promise((resolve, reject) => {
      Report.findAll({
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
   * Find One Report
   *
   * @param {any} query
   */
  static findOne(query: any) {
    return new Promise((resolve, reject) => {
      Report.findOne({
        where: query,
        include: [],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One Report
   *
   * @param {any} query
   */
  static findId(query: any) {
    return new Promise((resolve, reject) => {
      Report.findOne({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Update Report
   * @param {Report} report
   * @param {number} documentId 
   * @param {Object} payload
   */
  static update(
    report: Report,
    payload: Report,
    documentId: number,
    transaction?: Transaction,
  ) {
    return new Promise((resolve, reject) => {
      if (report) {
        if (payload.date) report.date = payload.date;
        if (payload.project_id) report.project_id = payload.project_id;
        if (payload.document_id) report.document_id = payload.document_id;
        if (payload.document_assignment_id) report.document_assignment_id = payload.document_assignment_id;
        if (payload.description) report.description = payload.description;
        if (payload.document_name) report.document_name = payload.document_name;
        if (payload.considered_doc_id) report.considered_doc_id = payload.considered_doc_id;
        if (payload.assigned_to) report.assigned_to = payload.assigned_to;
        if (payload.user_id) report.user_id = payload.user_id;
        if (payload.message) report.message = payload.message;
        if (payload.type) report.type = payload.type;
        if (payload.author) report.author = payload.author;
        if (payload.ref_no) report.ref_no = payload.ref_no;
        if (payload.status) report.status = payload.status;

        report
          .save({ transaction })
          .then((doc) => resolve(doc))
          .catch((error) => reject(error));
      } else {
        resolve(null);
      }
    });
  }

  /**
   * Delete Report
   *
   * @param {Object} query
   */
  static delete(query: any) {
    return new Promise((resolve, reject) => {
      Report.destroy({ where: query })
        .then((result) => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

export default ReportDAL;
