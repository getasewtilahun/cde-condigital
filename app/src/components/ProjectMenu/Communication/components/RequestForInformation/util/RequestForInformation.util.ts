import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { Document } from "../../../../../../redux/Document/Document.type";
import { DocumentAssignment } from "../../../../../../redux/DocumentAssignment/DocumentAssignment.type";
import { Project } from "../../../../../../redux/Project/Project.type";
import { RequestForInformation } from "../../../../../../redux/RequestForInformation/RequestForInformation.type";
import { User } from "../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../redux/Utils";
import { RequestForInformationStatus } from "../../../../../../redux/RequestForInformationStatus/RequestForInformationStatus.type";

export type RequestForInformationPropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  request_for_information: ApiCallState<RequestForInformation[]>;
  document_assignment: ApiCallState<DocumentAssignment[]>;
  fetchAllRequestForInformation: Function;
  fetchAllDocumentAssignment: Function;
  fetchUsers: Function;
  tab: any;
}

export type AddRFIPropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  document_assignment: ApiCallState<DocumentAssignment[]>;
  fetchAllRequestForInformation: Function;
};

export type EditRFIPropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  request_for_information: RequestForInformation;
  document_assignment: ApiCallState<DocumentAssignment[]>;
  fetchAllRequestForInformation: Function;
};

export type ActionStatusPropType = {
  document_assignment: DocumentAssignment;
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  fetchAllRequestForInformation: Function;
  category: string;
  folder: string;
  sub_folder: string;
  type: string;
  id: string;
}
export type AllActionStatusPropType = {
  request_for_information_status: ApiCallState<DocumentAssignment[]>;
  users: ApiCallState<User[]>;
  project: ApiCallState<Project>;
  fetchAllRequestForInformationStatus: Function;
  RequestID: any;
  request_for_information_statuses: any[];
  fetchUsers: Function;
  tab: any;
  document: any;
}

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/request-for-information", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const approveRequest = (data: any) =>
  axios.post(API_BASE_URI + "/document-status", data, {
    headers: {
    },
  });
export const answerForRequested = (data: any) =>
  axios.put(API_BASE_URI + "/request-for-information", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const answerRequested = (data: any) =>
  axios.put(API_BASE_URI + "/request-for-information", data, {
    headers: {
    },
  });

export const deleteData = (id: number) =>
  axios.delete(API_BASE_URI + `/request-for-information/${id}`);

export const consideredDocuments = (
  document_assignments: DocumentAssignment[]
) => {
  let parsed: Document[] = [];
  document_assignments.forEach((e) => {
    // if (e.user_assignment_item?.category === "Model") parsed.push(e.document);
  });
  return parsed;
};