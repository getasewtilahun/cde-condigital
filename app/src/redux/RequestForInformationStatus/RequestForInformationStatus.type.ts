import { ApiCallState } from "../Utils";
import { Document } from "../Document/Document.type";

export type RequestForInformationStatus = {
  id: number;
  request_for_information_id: number;
  project_id: number;
  date: string;
  from: number;
  status: string;
  message: string;
  document_id: Document;
};

export type RequestForInformationStatusStateTypes = {
  fetchAll: ApiCallState<RequestForInformationStatus[]>;
  fetchOne: ApiCallState<RequestForInformationStatus | {}>;
};

export const RequestForInformationStatusActionTypes = {
  FETCH_ALL_REQUEST_FOR_INFORMATION_STATUS: "FETCH_ALL_REQUEST_FOR_INFORMATION_STATUS",
  FETCH_ALL_REQUEST_FOR_INFORMATION_STATUS_RESET:
    "FETCH_ALL_REQUEST_FOR_INFORMATION_STATUS_RESET",
  FETCH_ALL_REQUEST_FOR_INFORMATION_STATUS_FAILURE:
    "FETCH_ALL_REQUEST_FOR_INFORMATION_STATUS_FAILURE",
  FETCH_ALL_REQUEST_FOR_INFORMATION_STATUS_SUCCESS:
    "FETCH_ALL_REQUEST_FOR_INFORMATION_STATUS_SUCCESS",

  FETCH_ONE_REQUEST_FOR_INFORMATION_STATUS: "FETCH_ONE_REQUEST_FOR_INFORMATION_STATUS",
  FETCH_ONE_REQUEST_FOR_INFORMATION_STATUS_RESET:
    "FETCH_ONE_REQUEST_FOR_INFORMATION_STATUS_RESET",
  FETCH_ONE_REQUEST_FOR_INFORMATION_STATUS_FAILURE:
    "FETCH_ONE_REQUEST_FOR_INFORMATION_STATUS_FAILURE",
  FETCH_ONE_REQUEST_FOR_INFORMATION_STATUS_SUCCESS:
    "FETCH_ONE_REQUEST_FOR_INFORMATION_STATUS_SUCCESS",
};
