import { ApiCallState, PagedData } from "../Utils";

export type DocumentNameSetting = {
  id?: number;
  project_code: string;
  Originator: string;
  functional_breakdown: string;
  spatial: string;
  form: number;
  discipline: number;
  number: number;
};

export type SettingStateTypes = {
  fetchAll: ApiCallState<DocumentNameSetting[]>;
  fetchOne: ApiCallState<DocumentNameSetting | {}>;
  fetchPaged: ApiCallState<PagedData<DocumentNameSetting[]>>;
};

export const SettingActionTypes = {
  FETCH_ALL_SETTING: "FETCH_ALL_SETTING",
  FETCH_ALL_SETTING_RESET: "FETCH_ALL_SETTING_RESET",
  FETCH_ALL_SETTING_FAILURE: "FETCH_ALL_SETTING_FAILURE",
  FETCH_ALL_SETTING_SUCCESS: "FETCH_ALL_SETTING_SUCCESS",

  FETCH_PAGED_SETTING: "FETCH_PAGED_SETTING",
  FETCH_PAGED_SETTING_RESET: "FETCH_PAGED_SETTING_RESET",
  FETCH_PAGED_SETTING_FAILURE: "FETCH_PAGED_SETTING_FAILURE",
  FETCH_PAGED_SETTING_SUCCESS: "FETCH_PAGED_SETTING_SUCCESS",

  FETCH_ONE_SETTING: "FETCH_ONE_SETTING",
  FETCH_ONE_SETTING_RESET: "FETCH_ONE_SETTING_RESET",
  FETCH_ONE_SETTING_FAILURE: "FETCH_ONE_SETTING_FAILURE",
  FETCH_ONE_SETTING_SUCCESS: "FETCH_ONE_SETTING_SUCCESS",
};
