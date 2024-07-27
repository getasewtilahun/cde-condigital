import { ApiCallState } from "../Utils";
import { Document } from "../Document/Document.type";

export type ScheduleMeeting= {
  id: number;
  project_id:number;
  subject:string;
  date:string;
  time:string;
  place:string;
  scheduled_by:number;
  participants:string;
  remark:string;
  user_id:number;
  document:Document;
};

export type ScheduleMeetingStateTypes = {
  fetchAll: ApiCallState<ScheduleMeeting[]>;
  fetchOne: ApiCallState<ScheduleMeeting | {}>;
};

export const ScheduleMeetingActionTypes = {
  FETCH_ALL_SCHEDULE_MEETING: "FETCH_ALL_SCHEDULE_MEETING",
  FETCH_ALL_SCHEDULE_MEETING_RESET: "FETCH_ALL_SCHEDULE_MEETING_RESET",
  FETCH_ALL_SCHEDULE_MEETING_FAILURE: "FETCH_ALL_SCHEDULE_MEETING_FAILURE",
  FETCH_ALL_SCHEDULE_MEETING_SUCCESS: "FETCH_ALL_SCHEDULE_MEETING_SUCCESS",

  FETCH_ONE_SCHEDULE_MEETING: "FETCH_ONE_SCHEDULE_MEETING",
  FETCH_ONE_SCHEDULE_MEETING_RESET: "FETCH_ONE_SCHEDULE_MEETING_RESET",
  FETCH_ONE_SCHEDULE_MEETING_FAILURE: "FETCH_ONE_SCHEDULE_MEETING_FAILURE",
  FETCH_ONE_SCHEDULE_MEETING_SUCCESS: "FETCH_ONE_SCHEDULE_MEETING_SUCCESS",
};
