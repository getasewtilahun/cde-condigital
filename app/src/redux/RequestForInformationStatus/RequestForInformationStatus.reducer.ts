import { RequestForInformationStatusStateTypes, RequestForInformationStatusActionTypes } from "./RequestForInformationStatus.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: RequestForInformationStatusStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const RequestForInformationStatusReducer = (
  state: RequestForInformationStatusStateTypes = INITIAL_STATE,
  action: any
): RequestForInformationStatusStateTypes => {
  switch (action.type) {
    case RequestForInformationStatusActionTypes.FETCH_ALL_REQUEST_FOR_INFORMATION_STATUS:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case RequestForInformationStatusActionTypes.FETCH_ALL_REQUEST_FOR_INFORMATION_STATUS_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case RequestForInformationStatusActionTypes.FETCH_ALL_REQUEST_FOR_INFORMATION_STATUS_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case RequestForInformationStatusActionTypes.FETCH_ALL_REQUEST_FOR_INFORMATION_STATUS_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },

      };

    case RequestForInformationStatusActionTypes.FETCH_ONE_REQUEST_FOR_INFORMATION_STATUS:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case RequestForInformationStatusActionTypes.FETCH_ONE_REQUEST_FOR_INFORMATION_STATUS_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case RequestForInformationStatusActionTypes.FETCH_ONE_REQUEST_FOR_INFORMATION_STATUS_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case RequestForInformationStatusActionTypes.FETCH_ONE_REQUEST_FOR_INFORMATION_STATUS_SUCCESS:
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

export default RequestForInformationStatusReducer;
