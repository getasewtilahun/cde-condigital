import { ReviewForApprovalStateTypes, ReviewForApprovalActionTypes } from "./ReviewForApproval.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ReviewForApprovalStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const ReviewForApprovalReducer = (
  state: ReviewForApprovalStateTypes = INITIAL_STATE,
  action: any
): ReviewForApprovalStateTypes => {
  switch (action.type) {
    case ReviewForApprovalActionTypes.FETCH_ALL_REVIEW_FOR_APPROVAL:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ReviewForApprovalActionTypes.FETCH_ALL_REVIEW_FOR_APPROVAL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ReviewForApprovalActionTypes.FETCH_ALL_REVIEW_FOR_APPROVAL_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ReviewForApprovalActionTypes.FETCH_ALL_REVIEW_FOR_APPROVAL_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ReviewForApprovalActionTypes.FETCH_ONE_REVIEW_FOR_APPROVAL:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ReviewForApprovalActionTypes.FETCH_ONE_REVIEW_FOR_APPROVAL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ReviewForApprovalActionTypes.FETCH_ONE_REVIEW_FOR_APPROVAL_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ReviewForApprovalActionTypes.FETCH_ONE_REVIEW_FOR_APPROVAL_SUCCESS:
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

export default ReviewForApprovalReducer;
