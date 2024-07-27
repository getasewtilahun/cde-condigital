import { ApiCallState, PagedData } from "../Utils";

export type UserRole = {
  id: number;
  name: string;
  user_accesses: UserAccess[];
};

export type UserAccess = {
  id?: number;
  feature: string;
  url: string;
  group: string;
  read: boolean;
  write: boolean;
  delete: boolean;
  edit: boolean;
  approve: boolean;
  check: boolean;
  entry_special: number[];
  approve_special: number[];
  key: number;
};

export type UserRoleStateTypes = {
  fetchAll: ApiCallState<UserRole[]>;
  fetchOne: ApiCallState<UserRole | {}>;
  fetchPaged: ApiCallState<PagedData<UserRole[]>>;
};

export const UserRoleActionTypes = {
  FETCH_ALL_USER_ROLE: "FETCH_ALL_USER_ROLE",
  FETCH_ALL_USER_ROLE_RESET: "FETCH_ALL_USER_ROLE_RESET",
  FETCH_ALL_USER_ROLE_FAILURE: "FETCH_ALL_USER_ROLE_FAILURE",
  FETCH_ALL_USER_ROLE_SUCCESS: "FETCH_ALL_USER_ROLE_SUCCESS",

  FETCH_PAGED_USER_ROLE: "FETCH_PAGED_USER_ROLE",
  FETCH_PAGED_USER_ROLE_RESET: "FETCH_PAGED_USER_ROLE_RESET",
  FETCH_PAGED_USER_ROLE_FAILURE: "FETCH_PAGED_USER_ROLE_FAILURE",
  FETCH_PAGED_USER_ROLE_SUCCESS: "FETCH_PAGED_USER_ROLE_SUCCESS",

  FETCH_ONE_USER_ROLE: "FETCH_ONE_USER_ROLE",
  FETCH_ONE_USER_ROLE_RESET: "FETCH_ONE_USER_ROLE_RESET",
  FETCH_ONE_USER_ROLE_FAILURE: "FETCH_ONE_USER_ROLE_FAILURE",
  FETCH_ONE_USER_ROLE_SUCCESS: "FETCH_ONE_USER_ROLE_SUCCESS",
};
