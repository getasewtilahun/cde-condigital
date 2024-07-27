import { ApiCallState } from "../Utils";

export type User = {
  organization: string;
  status: string;
  is_super_user: any;
  access_type: string;
  id: number;
  email: string;
  phone_number: string;
  role_id: string;
  chat_id: string;
  full_name: string;
  roles: string[];
  user_role: {
    user_accesses: any;
    id: number;
    name: string;
  };
  // add other user properties as needed
};

export const UserActionTypes = {
  FETCH_ALL_USER: "FETCH_ALL_USER",
  FETCH_ALL_USER_RESET: "FETCH_ALL_USER_RESET",
  FETCH_ALL_USER_FAILURE: "FETCH_ALL_USER_FAILURE",
  FETCH_ALL_USER_SUCCESS: "FETCH_ALL_USER_SUCCESS",

  FETCH_ONE_USER: "FETCH_ONE_USER",
  FETCH_ONE_USER_RESET: "FETCH_ONE_USER_RESET",
  FETCH_ONE_USER_FAILURE: "FETCH_ONE_USER_FAILURE",
  FETCH_ONE_USER_SUCCESS: "FETCH_ONE_USER_SUCCESS",

  FETCH_LOGGED_IN_USER: "FETCH_LOGGED_IN_USER",
  FETCH_LOGGED_IN_USER_RESET: "FETCH_LOGGED_IN_USER_RESET",
  FETCH_LOGGED_IN_USER_FAILURE: "FETCH_LOGGED_IN_USER_FAILURE",
  FETCH_LOGGED_IN_USER_SUCCESS: "FETCH_LOGGED_IN_USER_SUCCESS",

  FETCH_FEATURE_USER: "FETCH_FEATURE_USER",
  FETCH_FEATURE_USER_RESET: "FETCH_FEATURE_USER_RESET",
  FETCH_FEATURE_USER_FAILURE: "FETCH_FEATURE_USER_FAILURE",
  FETCH_FEATURE_USER_SUCCESS: "FETCH_FEATURE_USER_SUCCESS",

  FETCH_ASSIGNED_USER: "FETCH_ASSIGNED_USER",
  FETCH_ASSIGNED_USER_SUCCESS: "FETCH_ASSIGNED_USER_SUCCESS",
  FETCH_ASSIGNED_USER_FAILURE: "FETCH_ASSIGNED_USER_FAILURE",
} as const;

export type UserActionTypes = typeof UserActionTypes[keyof typeof UserActionTypes];

export type UserStateTypes = {
  fetchAll: ApiCallState<User[]>;
  fetchOne: ApiCallState<User>;
  fetchLoggedIn: ApiCallState<User>;
  fetchFeature: ApiCallState<User[]>;
};
