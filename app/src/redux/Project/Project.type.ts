import { ApiCallState, PagedData } from "../Utils";

export type Project = {
  [x: string]: any;
  start_date: string | number | Date;
  end_date: string | number | Date;
  createdAt: string | number | Date;
  code: string;
  id: number;
  name: string;
  project_type: string;
  type_of_asset: any;
  contract_type: string;
  project_budget: number;
};

export type ProjectStateTypes = {
  fetchAll: ApiCallState<Project[]>;
  fetchOne: ApiCallState<Project | {}>;
  fetchPaged: ApiCallState<PagedData<Project[]>>;
};

export const ProjectActionTypes = {
  FETCH_ALL_PROJECT: "FETCH_ALL_PROJECT",
  FETCH_ALL_PROJECT_RESET: "FETCH_ALL_PROJECT_RESET",
  FETCH_ALL_PROJECT_FAILURE: "FETCH_ALL_PROJECT_FAILURE",
  FETCH_ALL_PROJECT_SUCCESS: "FETCH_ALL_PROJECT_SUCCESS",

  FETCH_PAGED_PROJECT: "FETCH_PAGED_PROJECT",
  FETCH_PAGED_PROJECT_RESET: "FETCH_PAGED_PROJECT_RESET",
  FETCH_PAGED_PROJECT_FAILURE: "FETCH_PAGED_PROJECT_FAILURE",
  FETCH_PAGED_PROJECT_SUCCESS: "FETCH_PAGED_PROJECT_SUCCESS",

  FETCH_ONE_PROJECT: "FETCH_ONE_PROJECT",
  FETCH_ONE_PROJECT_RESET: "FETCH_ONE_PROJECT_RESET",
  FETCH_ONE_PROJECT_FAILURE: "FETCH_ONE_PROJECT_FAILURE",
  FETCH_ONE_PROJECT_SUCCESS: "FETCH_ONE_PROJECT_SUCCESS",
};
