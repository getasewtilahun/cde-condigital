import { ApiCallState, PagedData } from "../Utils";
import { User } from "../User/User.type";

export type Log = {
  id: number;
  table: string;
  action: string;
  description: string;
  date: string;
  project_id: number;
  user_id: number;
  user: User;
};

export type LogStateTypes = {
  fetchAll: ApiCallState<Log[]>;
  fetchOne: ApiCallState<Log | {}>;
  fetchPaged: ApiCallState<PagedData<Log[]>>;
};

export const LogActionTypes = {
  FETCH_ALL_LOG: "FETCH_ALL_LOG",
  FETCH_ALL_LOG_RESET: "FETCH_ALL_LOG_RESET",
  FETCH_ALL_LOG_FAILURE: "FETCH_ALL_LOG_FAILURE",
  FETCH_ALL_LOG_SUCCESS: "FETCH_ALL_LOG_SUCCESS",

  FETCH_PAGED_LOG: "FETCH_PAGED_LOG",
  FETCH_PAGED_LOG_RESET: "FETCH_PAGED_LOG_RESET",
  FETCH_PAGED_LOG_FAILURE: "FETCH_PAGED_LOG_FAILURE",
  FETCH_PAGED_LOG_SUCCESS: "FETCH_PAGED_LOG_SUCCESS",

  FETCH_ONE_LOG: "FETCH_ONE_LOG",
  FETCH_ONE_LOG_RESET: "FETCH_ONE_LOG_RESET",
  FETCH_ONE_LOG_FAILURE: "FETCH_ONE_LOG_FAILURE",
  FETCH_ONE_LOG_SUCCESS: "FETCH_ONE_LOG_SUCCESS",
};
