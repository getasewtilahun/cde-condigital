import { DocumentActionTypes } from "./Document.type";

/**
 * Fetch All Documents
 *
 * @param payload
 */
export const fetchAllDocuments = (payload?: any) => ({
  type: DocumentActionTypes.FETCH_ALL_DOCUMENT,
  payload: payload,
});

/**
 * Reset Fetch Documents State
 *
 * @param payload
 */
export const fetchAllDocumentsReset = (payload?: any) => ({
  type: DocumentActionTypes.FETCH_ALL_DOCUMENT_RESET,
  payload: payload,
});
