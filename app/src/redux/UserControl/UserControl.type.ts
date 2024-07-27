import { User } from "../User/User.type";
import { UserRole } from "../UserRole/UserRole.type";
import { ApiCallState } from "../Utils";

export type UserControl = {
  id: number;
  user_id: number;
  role_id: number;
  user_role: UserRole;
  access_type: string;
  createdAt: string;
  user: User;
};

export type UserControlStateTypes = {
  fetchAll: ApiCallState<UserControl[]>;
  fetchOne: ApiCallState<UserControl | {}>;
};

export const UserControlActionTypes = {
  FETCH_ALL_USER_CONTROL: "FETCH_ALL_USER_CONTROL",
  FETCH_ALL_USER_CONTROL_RESET: "FETCH_ALL_USER_CONTROL_RESET",
  FETCH_ALL_USER_CONTROL_FAILURE: "FETCH_ALL_USER_CONTROL_FAILURE",
  FETCH_ALL_USER_CONTROL_SUCCESS: "FETCH_ALL_USER_CONTROL_SUCCESS",

  FETCH_ONE_USER_CONTROL: "FETCH_ONE_USER_CONTROL",
  FETCH_ONE_USER_CONTROL_RESET: "FETCH_ONE_USER_CONTROL_RESET",
  FETCH_ONE_USER_CONTROL_FAILURE: "FETCH_ONE_USER_CONTROL_FAILURE",
  FETCH_ONE_USER_CONTROL_SUCCESS: "FETCH_ONE_USER_CONTROL_SUCCESS",
};
