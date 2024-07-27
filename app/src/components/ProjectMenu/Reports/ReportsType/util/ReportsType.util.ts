import axios from "axios";
import { API_BASE_URI } from "../../../../../redux/ApiCall";
import { DocumentAssignment } from "../../../../../redux/DocumentAssignment/DocumentAssignment.type";
import { Project } from "../../../../../redux/Project/Project.type";
import { Reports } from "../../../../../redux/Reports/Reports.type";
import { User } from "../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../redux/Utils";
import { Document } from "../../../../../redux/Document/Document.type";

export type ReportsTypePropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  document_assignment: ApiCallState<DocumentAssignment[]>;
  reports: ApiCallState<Reports[]>;
  fetchAllReports: Function;
  fetchAllDocumentAssignment: Function;
  fetchUsers: Function;
  type: string;
  tab: any;
};

export type AddRTPropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  reports: ApiCallState<Reports[]>;
  document_assignment: ApiCallState<DocumentAssignment[]>;
  fetchAllReports: Function;
  type: string;
};

export type EditRTPropType = {
  project: ApiCallState<Project>;
  users: ApiCallState<User[]>;
  reports: Reports;
  document_assignment: ApiCallState<DocumentAssignment[]>;
  fetchAllReports: Function;
  type: string;
}

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/report", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateDataWithFile = (data: any) =>
  axios.put(API_BASE_URI + "/report", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const updateDataWithOutFile = (data: any) =>
  axios.put(API_BASE_URI + "/report", data, {
    headers: {
    },
  });

export const deleteData = (id: number) =>
  axios.delete(API_BASE_URI + `/report/${id}`);


export const consideredDocuments = (document_assignments: DocumentAssignment[]) => {
  let parsed: Document[] = [];
  document_assignments.forEach((e) => {
    if (e.user_assignment_item?.category === "Model")
      parsed.push(e.document);
  })
  return parsed;
}