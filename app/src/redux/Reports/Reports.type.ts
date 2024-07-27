import { ApiCallState } from "../Utils";
import { Document } from "../Document/Document.type";

export type Reports= {
  id: number;
  project_id:number;
  document_name:string;
  date:string;
  type:string;
  author:number;
  description:string;
  ref_no: string;
  considered_doc_id:number;
  assigned_to: string;
  user_id:number;
  document:Document;
  considered_doc:Document;
};

export type ReportsStateTypes = {
  fetchAll: ApiCallState<Reports[]>;
  fetchOne: ApiCallState<Reports | {}>;
};

export const ReportsActionTypes = {
  FETCH_ALL_REPORTS: "FETCH_ALL_REPORTS",
  FETCH_ALL_REPORTS_RESET: "FETCH_ALL_REPORTS_RESET",
  FETCH_ALL_REPORTS_FAILURE: "FETCH_ALL_REPORTS_FAILURE",
  FETCH_ALL_REPORTS_SUCCESS: "FETCH_ALL_REPORTS_SUCCESS",

  FETCH_ONE_REPORTS: "FETCH_ONE_REPORTS",
  FETCH_ONE_REPORTS_RESET: "FETCH_ONE_REPORTS_RESET",
  FETCH_ONE_REPORTS_FAILURE: "FETCH_ONE_REPORTS_FAILURE",
  FETCH_ONE_REPORTS_SUCCESS: "FETCH_ONE_REPORTS_SUCCESS",
};
