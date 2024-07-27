import { Document } from "../Document/Document.type";
import { ApiCallState } from "../Utils";
import { UserAssignment } from "../UserAssignment/UserAssignment.type";

export type DocumentAssignment = {
  sub_folder: string;
  DocumentStatuses: any;
  file: any;
  functional_breakdown(functional_breakdown: any): unknown;
  spatial(spatial: any): unknown;
  forms(forms: any): unknown;
  discipline(discipline: any): unknown;
  originator(originator: any): unknown;
  createdAt: string | number | Date;
  id: number;
  project_id: number;
  date: string;
  action_by: number;
  type: string;
  author: number;
  description: string;
  status: string;
  statu_s: string;
  revision: string;
  classification: string;
  document_name: string;
  format: string;
  user_id: number;
  reject: boolean;
  document: Document;
};

export type DocumentAssignmentAccessor = {
  id: number;
  document_assignment_id: number;
  user_id: number;
}

export type DocumentAssignmentStateTypes = {
  fetchAll: ApiCallState<DocumentAssignment[]>;
  fetchOne: ApiCallState<DocumentAssignment | {}>;
};

export const DocumentAssignmentActionTypes = {
  FETCH_ALL_DOCUMENT_ASSIGNMENT: "FETCH_ALL_DOCUMENT_ASSIGNMENT",
  FETCH_ALL_DOCUMENT_ASSIGNMENT_RESET: "FETCH_ALL_DOCUMENT_ASSIGNMENT_RESET",
  FETCH_ALL_DOCUMENT_ASSIGNMENT_FAILURE: "FETCH_ALL_DOCUMENT_ASSIGNMENT_FAILURE",
  FETCH_ALL_DOCUMENT_ASSIGNMENT_SUCCESS: "FETCH_ALL_DOCUMENT_ASSIGNMENT_SUCCESS",

  FETCH_ONE_DOCUMENT_ASSIGNMENT: "FETCH_ONE_DOCUMENT_ASSIGNMENT",
  FETCH_ONE_DOCUMENT_ASSIGNMENT_RESET: "FETCH_ONE_DOCUMENT_ASSIGNMENT_RESET",
  FETCH_ONE_DOCUMENT_ASSIGNMENT_FAILURE: "FETCH_ONE_DOCUMENT_ASSIGNMENT_FAILURE",
  FETCH_ONE_DOCUMENT_ASSIGNMENT_SUCCESS: "FETCH_ONE_DOCUMENT_ASSIGNMENT_SUCCESS",
};
