import { CommunicationMessage } from "../CommunicationMessage/CommunicationMessage.type";
import { User } from "../User/User.type";
import { ApiCallState } from "../Utils";

export type CommunicationGroup = {
  id: number;
  user_id: number;
  uid: string;

  name: string;
  unseen_messages: number;

  last_seen: Date;

  readonly createdAt: Date;
  readonly updatedAt: Date;

  communication_group_users: CommunicationGroupUser[];
  communication_messages: CommunicationMessage[];
};

export type CommunicationGroupUser = {
  id: number;
  communication_group_id: number;
  user_id: number;

  last_seen: Date;

  user: User;

  readonly createdAt: Date;
  readonly updatedAt: Date;
};

export type CommunicationGroupStateTypes = {
  fetchAll: ApiCallState<CommunicationGroup[]>;
  fetchAllUsers: ApiCallState<CommunicationGroupUser[]>;
};

export const CommunicationGroupActionTypes = {
  FETCH_ALL_COMMUNICATION_GROUP: "FETCH_ALL_COMMUNICATION_GROUP",
  FETCH_ALL_COMMUNICATION_GROUP_RESET: "FETCH_ALL_COMMUNICATION_GROUP_RESET",
  FETCH_ALL_COMMUNICATION_GROUP_FAILURE:
    "FETCH_ALL_COMMUNICATION_GROUP_FAILURE",
  FETCH_ALL_COMMUNICATION_GROUP_SUCCESS:
    "FETCH_ALL_COMMUNICATION_GROUP_SUCCESS",

  FETCH_ALL_COMMUNICATION_GROUP_USER: "FETCH_ALL_COMMUNICATION_GROUP_USER",
  FETCH_ALL_COMMUNICATION_GROUP_USER_RESET:
    "FETCH_ALL_COMMUNICATION_GROUP_USER_RESET",
  FETCH_ALL_COMMUNICATION_GROUP_USER_FAILURE:
    "FETCH_ALL_COMMUNICATION_GROUP_USER_FAILURE",
  FETCH_ALL_COMMUNICATION_GROUP_USER_SUCCESS:
    "FETCH_ALL_COMMUNICATION_GROUP_USER_SUCCESS",
};
