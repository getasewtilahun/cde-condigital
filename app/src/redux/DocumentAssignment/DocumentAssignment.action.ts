import { DocumentAssignmentActionTypes } from "./DocumentAssignment.type";

/**
 * Fetch All DocumentAssignment
 *
 * @param payload
 */
export const fetchAllDocumentAssignment = (payload?: any) => ({
  type: DocumentAssignmentActionTypes.FETCH_ALL_DOCUMENT_ASSIGNMENT,
  payload: payload,
});

/**
 * Fetch All DocumentAssignment
 *
 * @param payload
 */
export const fetchOneDocumentAssignment = (payload?: any) => ({
  type: DocumentAssignmentActionTypes.FETCH_ONE_DOCUMENT_ASSIGNMENT,
  payload: payload,
});

/**
 * Reset Fetch DocumentAssignment State
 *
 * @param payload
 */
export const fetchAllDocumentAssignmentReset = (payload?: any) => ({
  type: DocumentAssignmentActionTypes.FETCH_ALL_DOCUMENT_ASSIGNMENT_RESET,
  payload: payload,
});



