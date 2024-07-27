import {
  InternalServerError,
  BadRequestError,
  NotFoundError,
} from "../../errors/Errors";
import { createTransaction, } from "../../utilities/database/sequelize";
import async from "async";
import { Transaction } from "sequelize/types";
import ScheduleMeetingDAL from "../../dals/Communication/ScheduleMeeting.dal";
import DocumentDAL from "../../dals/Document.dal";
import { ScheduleMeeting } from "../../models/Communication/ScheduleMeeting.model";

class ScheduleMeetingService {
  /**
 * Create ScheduleMeeting
 *
 * @param {ScheduleMeeting} schedule_meeting
 * @param {Transaction} transaction
 */
  static create(schedule_meeting: any, transaction?: Transaction): Promise<any> {
    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          (done: Function) => {
            createTransaction()
              .then((transaction) => done(null, transaction))
              .catch((error) => reject(new InternalServerError(error)));
          },
          (transaction: Transaction, done: Function) => {
            if (schedule_meeting.url && schedule_meeting.size) {
              let document = {
                name: `Document Assignment (${schedule_meeting.name})`,
                project_id: schedule_meeting.project_id,
                user_id: schedule_meeting.user_id,
                url: schedule_meeting.url,
                is_private: true,
                type: "Document Assignment",
                size: schedule_meeting.size,
              };

              console.log("This is request for information service");
              console.log(document);

              DocumentDAL.create(document, transaction)
                .then((result) => done(null, transaction, result.id))
                .catch((error) => {
                  console.log("Error in DocumentDAL.create:", error);
                  done(new InternalServerError(error), transaction);
                });
            } else {
              // If no file, pass null as document_id
              done(null, transaction, null);
            }
          },
          (transaction: Transaction, document_id: number | null, done: Function) => {
            console.log('Document ID', document_id);
            ScheduleMeetingDAL.create({ ...schedule_meeting, document_id }, transaction)
              .then((result) => done(null, transaction, result.id))
              .catch((error) => done(new InternalServerError(error), transaction));
          },
        ],
        (error, transaction: any) => {
          if (error) {
            reject(error);
            console.log(error);
            transaction.rollback();
          } else {
            transaction.commit();
            resolve(true);
          }
        }
      );
    });
  }

  /**
   * Find All ScheduleMeeting
   *
   * @param {string} term
   *
   * @returns {Promise<ScheduleMeeting[]>}
   */
  public static findAll(query: any): Promise<ScheduleMeeting[]> {
    return new Promise((resolve, reject) => {
      let updateQuery: any = {}
      if (query.project_id) {
        updateQuery.project_id = query.project_id;
      }
      if (query.type) {
        updateQuery = {
          ...updateQuery,
          type: query.type
        }
      }

      ScheduleMeetingDAL.findMany(updateQuery)
        .then((docs: any) => {
          resolve(docs);
        })
        .catch((error: any) => {
          console.log('service kkkkkkkkkkkkkkkkkk', error);
          reject(new InternalServerError(error));
        });
    });
  }

  /**
   * Find ScheduleMeetingBy ID
   *
   * @param {string} id
   */
  public static findByID(id: string): Promise<ScheduleMeeting> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      ScheduleMeetingDAL.findOne(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }

  /**
  * Update ScheduleMeeting
  *
  * @param {number} id - ID of the ScheduleMeeting to update
  * @param {ScheduleMeeting} payload - Updated data
  * @param {Transaction} transaction - Optional transaction for Sequelize
  */
  static update(id: number, payload: ScheduleMeeting, transaction?: Transaction): Promise<any> {
    console.log("Updating ScheduleMeeting with id:", id);
    console.log("Updating ScheduleMeeting Data:", payload);

    return new Promise((resolve, reject) => {
      async.waterfall(
        [
          // Step 1: Find the existing ScheduleMeeting by ID
          (done: Function) => {
            ScheduleMeetingDAL.findOne({ id: id })
              .then((schedule_meeting) => {
                if (schedule_meeting) {
                  done(null, schedule_meeting);
                } else {
                  done(new NotFoundError("ScheduleMeeting not found"));
                }
              })
              .catch((error) => done(new InternalServerError(error)));
          },
          // Step 2: Create a transaction if not provided
          (schedule_meeting: ScheduleMeeting, done: Function) => {
            if (!transaction) {
              createTransaction()
                .then((newTransaction) => done(null, schedule_meeting, newTransaction))
                .catch((error) => done(new InternalServerError(error)));
            } else {
              done(null, schedule_meeting, transaction);
            }
          },
          // Step 3: Create a new Document
          (schedule_meeting: ScheduleMeeting, transaction: Transaction, done: Function) => {
            if (payload.size) {
              let document = {
                name: `Request For Information (${payload.name})`,
                project_id: payload.project_id,
                user_id: payload.user_id,
                url: payload.url,
                is_private: true,
                type: "Request For Information",
                size: payload.size,
              };

              DocumentDAL.create(document, transaction)
                .then((createdDocument) => done(null, schedule_meeting, createdDocument.id, transaction))
                .catch((error) => done(new InternalServerError(error), transaction));
            } else {
              // No document creation needed if size is not provided
              done(null, schedule_meeting, null, transaction);
            }
          },
          // Step 4: Update the ScheduleMeeting with document_id if created
          (schedule_meeting: ScheduleMeeting, document_id: any, transaction: Transaction, done: Function) => {
            if (document_id) {
              payload.document_id = document_id; // Update payload with document_id
            }

            ScheduleMeetingDAL.update(schedule_meeting, payload, transaction)
              .then((updatedScheduleMeeting) => {
                done(null, updatedScheduleMeeting, transaction);
              })
              .catch((error) => done(new BadRequestError(error), transaction));
          },
        ],
        // Final callback to handle errors and resolve/reject the promise
        (error: any, result: any, transaction?: Transaction) => {
          if (error) {
            if (transaction) {
              transaction.rollback(); // Rollback transaction on error
            }
            reject(error);
          } else {
            if (transaction) {
              transaction.commit(); // Commit transaction on success
            }
            resolve(result);
          }
        }
      );
    });
  }

  /**
   * Delete ScheduleMeeting By ID
   *
   * @param {string} id
   */
  public static delete(id: string): Promise<ScheduleMeeting> {
    return new Promise((resolve, reject) => {
      let query: any = { id: id };
      ScheduleMeetingDAL.delete(query)
        .then((result: any) => resolve(result))
        .catch((error: any) => {
          reject(new InternalServerError(error));
        });
    });
  }
}

export default ScheduleMeetingService;
