import { ApiCallState } from "../Utils";
import { Document } from "../Document/Document.type";

export type RequestForInformation = {
  id: number;
  project_id: number;
  subject: string;
  description: string;
  reference_no: string;
  considered_doc_id: number;
  date: string;
  from: number;
  assigned_to: number;
  cc: string;
  status:string;
  user_id: number;
  document: Document;
  considered_doc_info: Document;
};

export type RequestForInformationStateTypes = {
  fetchAll: ApiCallState<RequestForInformation[]>;
  fetchOne: ApiCallState<RequestForInformation | {}>;
};

export const RequestForInformationActionTypes = {
  FETCH_ALL_REQUEST_FOR_INFORMATION: "FETCH_ALL_REQUEST_FOR_INFORMATION",
  FETCH_ALL_REQUEST_FOR_INFORMATION_RESET:
    "FETCH_ALL_REQUEST_FOR_INFORMATION_RESET",
  FETCH_ALL_REQUEST_FOR_INFORMATION_FAILURE:
    "FETCH_ALL_REQUEST_FOR_INFORMATION_FAILURE",
  FETCH_ALL_REQUEST_FOR_INFORMATION_SUCCESS:
    "FETCH_ALL_REQUEST_FOR_INFORMATION_SUCCESS",

  FETCH_ONE_REQUEST_FOR_INFORMATION: "FETCH_ONE_REQUEST_FOR_INFORMATION",
  FETCH_ONE_REQUEST_FOR_INFORMATION_RESET:
    "FETCH_ONE_REQUEST_FOR_INFORMATION_RESET",
  FETCH_ONE_REQUEST_FOR_INFORMATION_FAILURE:
    "FETCH_ONE_REQUEST_FOR_INFORMATION_FAILURE",
  FETCH_ONE_REQUEST_FOR_INFORMATION_SUCCESS:
    "FETCH_ONE_REQUEST_FOR_INFORMATION_SUCCESS",
};
