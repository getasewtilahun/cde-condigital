import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { Project } from "../../../../../../redux/Project/Project.type";
import { ScheduleMeeting } from "../../../../../../redux/ScheduleMeeting/ScheduleMeeting.type";
import { User } from "../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../redux/Utils";

export type ScheduleMeetingPropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  schedule_meeting: ApiCallState<ScheduleMeeting[]>;
  fetchAllScheduleMeeting: Function;
  fetchUsers: Function;
  tab: any;
};

export type AddSMPropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  fetchAllScheduleMeeting: Function;
};

export type EditSMPropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  schedule_meeting: ScheduleMeeting;
  fetchAllScheduleMeeting: Function;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/schedule-meeting", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateData = (data: any) =>
  axios.put(API_BASE_URI + "/schedule-meeting", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteData = (id: number) =>
  axios.delete(API_BASE_URI + `/schedule-meeting/${id}`);
