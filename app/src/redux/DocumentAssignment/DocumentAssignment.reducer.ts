import { DocumentAssignmentStateTypes, DocumentAssignmentActionTypes } from "./DocumentAssignment.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: DocumentAssignmentStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),

};

const DocumentAssignmentReducer = (
  state: DocumentAssignmentStateTypes = INITIAL_STATE,
  action: any
): DocumentAssignmentStateTypes => {
  switch (action.type) {
    case DocumentAssignmentActionTypes.FETCH_ALL_DOCUMENT_ASSIGNMENT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case DocumentAssignmentActionTypes.FETCH_ALL_DOCUMENT_ASSIGNMENT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case DocumentAssignmentActionTypes.FETCH_ALL_DOCUMENT_ASSIGNMENT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case DocumentAssignmentActionTypes.FETCH_ALL_DOCUMENT_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case DocumentAssignmentActionTypes.FETCH_ONE_DOCUMENT_ASSIGNMENT:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case DocumentAssignmentActionTypes.FETCH_ONE_DOCUMENT_ASSIGNMENT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case DocumentAssignmentActionTypes.FETCH_ONE_DOCUMENT_ASSIGNMENT_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case DocumentAssignmentActionTypes.FETCH_ONE_DOCUMENT_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        fetchOne: {
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

export default DocumentAssignmentReducer;
