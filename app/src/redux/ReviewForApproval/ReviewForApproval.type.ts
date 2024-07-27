import { ApiCallState } from "../Utils";
import { Document } from "../Document/Document.type";

export type ReviewForApproval= {
    id: number;
    project_id:number;
    subject:string;
    description:string;
    reference_no:string;
    considered_doc_id:number;
    date:string;
    from:number;
    assigned_to: number;
    cc: string;
    status:string;
    user_id:number;
    document:Document;
    considered_doc_approval:Document;
};

export type ReviewForApprovalStateTypes = {
  fetchAll: ApiCallState<ReviewForApproval[]>;
  fetchOne: ApiCallState<ReviewForApproval | {}>;
};

export const ReviewForApprovalActionTypes = {
  FETCH_ALL_REVIEW_FOR_APPROVAL: "FETCH_ALL_REVIEW_FOR_APPROVAL",
  FETCH_ALL_REVIEW_FOR_APPROVAL_RESET: "FETCH_ALL_REVIEW_FOR_APPROVAL_RESET",
  FETCH_ALL_REVIEW_FOR_APPROVAL_FAILURE: "FETCH_ALL_REVIEW_FOR_APPROVAL_FAILURE",
  FETCH_ALL_REVIEW_FOR_APPROVAL_SUCCESS: "FETCH_ALL_REVIEW_FOR_APPROVAL_SUCCESS",

  FETCH_ONE_REVIEW_FOR_APPROVAL: "FETCH_ONE_REVIEW_FOR_APPROVAL",
  FETCH_ONE_REVIEW_FOR_APPROVAL_RESET: "FETCH_ONE_REVIEW_FOR_APPROVAL_RESET",
  FETCH_ONE_REVIEW_FOR_APPROVAL_FAILURE: "FETCH_ONE_REVIEW_FOR_APPROVAL_FAILURE",
  FETCH_ONE_REVIEW_FOR_APPROVAL_SUCCESS: "FETCH_ONE_REVIEW_FOR_APPROVAL_SUCCESS",
};
