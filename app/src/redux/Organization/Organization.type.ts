import { ApiCallState, PagedData } from "../Utils";

export type Organization = {
  [x: string]: any;
  id: number;
  name: string;
  code: string;
  specialization: string;
  location: string;
  website: string;
  email: string;
  phone: string;
  project_id: number;
  createdAt: string | number | Date;

};

export type OrganizationStateTypes = {
  fetchAll: ApiCallState<Organization[]>;
  fetchOne: ApiCallState<Organization | {}>;
  fetchPaged: ApiCallState<PagedData<Organization[]>>;
};

export const OrganizationActionTypes = {
  FETCH_ALL_ORGANIZATION: "FETCH_ALL_ORGANIZATION",
  FETCH_ALL_ORGANIZATION_RESET: "FETCH_ALL_ORGANIZATION_RESET",
  FETCH_ALL_ORGANIZATION_FAILURE: "FETCH_ALL_ORGANIZATION_FAILURE",
  FETCH_ALL_ORGANIZATION_SUCCESS: "FETCH_ALL_ORGANIZATION_SUCCESS",

  FETCH_PAGED_ORGANIZATION: "FETCH_PAGED_ORGANIZATION",
  FETCH_PAGED_ORGANIZATION_RESET: "FETCH_PAGED_ORGANIZATION_RESET",
  FETCH_PAGED_ORGANIZATION_FAILURE: "FETCH_PAGED_ORGANIZATION_FAILURE",
  FETCH_PAGED_ORGANIZATION_SUCCESS: "FETCH_PAGED_ORGANIZATION_SUCCESS",

  FETCH_ONE_ORGANIZATION: "FETCH_ONE_ORGANIZATION",
  FETCH_ONE_ORGANIZATION_RESET: "FETCH_ONE_ORGANIZATION_RESET",
  FETCH_ONE_ORGANIZATION_FAILURE: "FETCH_ONE_ORGANIZATION_FAILURE",
  FETCH_ONE_ORGANIZATION_SUCCESS: "FETCH_ONE_ORGANIZATION_SUCCESS",
};
