import { Transaction } from "sequelize/types";
import { Op } from "sequelize";
import { Document } from "../models/Document";
import { Project } from "../models/Project";
import { isNil } from "lodash";
import { getInitials } from "../utilities/helper/helper";
import moment from "moment";
import async from "async";

class DocumentDAL {
  /**
   * Create Document
   *
   * @param {Document} document
   * @param {Transaction} transaction
   */

  static create(document: any, transaction?: Transaction): Promise<any> {
    return new Promise((resolve, reject) => {
      let year = moment().format("YYYY");
      console.log('document dal');

      async.waterfall(
        [
          (done: Function) => {
            this.findMany({
              reference_number: { [Op.like]: `%${year}%` },
            })
              .then((result) => done(null, result))
              .catch((error) => {
                done(error)
                console.log("Dal error >>>>>>>>>>>>>>>>>>", error);

              });

          },
          (documents: Document[], done: Function) => {
            let numPad = String(documents.length + 1).padStart(5, "0");

            let initials = getInitials(document.type);

            const reference_number = `${initials}/${year}/${numPad}`;

            Document.create(
              {
                reference_number,
                date: document.date,
                name: document.name,
                project_id:
                  document.project_id !== "" ? document.project_id : null,
                user_id: document.user_id,
                url: document.url,
                type: document.type,
                size: document.size,
                is_private: document.is_private,
              },
              { transaction: transaction }
            )
              .then((result) => resolve(result))
              .catch((error) => {
                done(error);
              });
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
   * Find Many Document
   *
   * @param {any} query
   */
  static findMany(query: any) {
    return new Promise((resolve, reject) => {
      Document.findAll({
        where: query,
        include: [{ model: Project, attributes: ["name"] }],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One Document
   *
   * @param {any} query
   */
  static findOne(query: any) {
    return new Promise((resolve, reject) => {
      Document.findOne({ where: query })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Update Document
   * @param {Document} document
   * @param {Object} payload
   */

  static update(
    document: Document,
    payload: Document,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      if (document) {
        if (payload.date) document.date = payload.date;
        if (payload.name) document.name = payload.name;
        if (payload.project_id) document.project_id = payload.project_id;
        if (payload.date) document.date = payload.date;
        if (payload.url) document.url = payload.url;
        if (payload.type) document.type = payload.type;
        if (payload.user_id) document.user_id = payload.user_id;
        if (payload.size) document.size = payload.size;
        if (!isNil(payload.is_private))
          document.is_private = payload.is_private;

        document
          .save({ transaction })
          .then((doc) => resolve(doc))
          .catch((error) => reject(error));
      } else {
        resolve(null);
      }
    });
  }

  /**
   * Delete Document
   *
   * @param {Object} query
   */
  static delete(query: any, transaction: Transaction) {
    return new Promise((resolve, reject) => {
      Document.destroy({ where: query, transaction: transaction })
        .then(() => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

export default DocumentDAL;
