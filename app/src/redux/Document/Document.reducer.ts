import { DocumentStateTypes, DocumentActionTypes } from "./Document.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: DocumentStateTypes = {
  fetchAll: resetApiCallState([]),
};

const DocumentReducer = (
  state: DocumentStateTypes = INITIAL_STATE,
  action: any
): DocumentStateTypes => {
  switch (action.type) {
    case DocumentActionTypes.FETCH_ALL_DOCUMENT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case DocumentActionTypes.FETCH_ALL_DOCUMENT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case DocumentActionTypes.FETCH_ALL_DOCUMENT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case DocumentActionTypes.FETCH_ALL_DOCUMENT_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    default:
      return state;
  }
};

export default DocumentReducer;
