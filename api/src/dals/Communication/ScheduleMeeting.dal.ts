import { Transaction } from "sequelize/types";
import { ScheduleMeeting } from "../../models/Communication/ScheduleMeeting.model";
import { Document } from "../../models/Document";
class ScheduleMeetingDAL {
  /**
   * Create ScheduleMeeting
   *
   * @param {ScheduleMeeting} schedule_meeting
   * @param {Transaction} transaction
   */
  static create(
    schedule_meeting: any,
    transaction?: Transaction
  ): Promise<ScheduleMeeting> {
    return new Promise((resolve, reject) => {

      console.log('dallllllllllllllllllllll');
      ScheduleMeeting.create(schedule_meeting, {
        transaction: transaction,
      })
        .then((result) => resolve(result))
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Find Many ScheduleMeeting
   *
   * @param {any} query
   */
  static findMany(query: any) {
    console.log({ query });
    return new Promise((resolve, reject) => {
      ScheduleMeeting.findAll({
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
   * Find One ScheduleMeeting
   *
   * @param {any} query
   */
  static findOne(query: any) {
    return new Promise((resolve, reject) => {
      ScheduleMeeting.findOne({
        where: query,
        include: [
        ],
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Find One ScheduleMeeting
   *
   * @param {any} query
   */
  static findId(query: any) {
    return new Promise((resolve, reject) => {
      ScheduleMeeting.findOne({
        where: query,
      })
        .then((result) => resolve(result))
        .catch((error) => reject(error));
    });
  }

  /**
   * Update ScheduleMeeting
   * @param {ScheduleMeeting} schedule_meeting
   * @param {Object} payload
   */
  static update(
    schedule_meeting: ScheduleMeeting,
    payload: ScheduleMeeting,
    transaction?: Transaction
  ) {
    return new Promise((resolve, reject) => {
      if (schedule_meeting) {
        if (payload.date) schedule_meeting.date = payload.date;
        if (payload.project_id) schedule_meeting.project_id = payload.project_id;
        if (payload.document_id) schedule_meeting.document_id = payload.document_id;
        if (payload.subject) schedule_meeting.subject = payload.subject;
        if (payload.user_id) schedule_meeting.user_id = payload.user_id;
        if (payload.ajenda) schedule_meeting.ajenda = payload.ajenda;
        if (payload.time) schedule_meeting.time = payload.time;
        if (payload.place) schedule_meeting.place = payload.place;
        if (payload.scheduled_by) schedule_meeting.scheduled_by = payload.scheduled_by;
        if (payload.participants) schedule_meeting.participants = payload.participants;
        if (payload.remark) schedule_meeting.remark = payload.remark;
        schedule_meeting
          .save({ transaction })
          .then((doc) => resolve(doc))
          .catch((error) => reject(error));
      } else {
        resolve(null);
      }
    });
  }

  /**
   * Delete ScheduleMeeting
   *
   * @param {Object} query
   */
  static delete(query: any) {
    return new Promise((resolve, reject) => {
      ScheduleMeeting.destroy({ where: query })
        .then((result) => resolve(true))
        .catch((error) => reject(error));
    });
  }
}

export default ScheduleMeetingDAL;
