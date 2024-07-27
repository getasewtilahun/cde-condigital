import { RequestForInformationStateTypes, RequestForInformationActionTypes } from "./RequestForInformation.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: RequestForInformationStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const RequestForInformationReducer = (
  state: RequestForInformationStateTypes = INITIAL_STATE,
  action: any
): RequestForInformationStateTypes => {
  switch (action.type) {
    case RequestForInformationActionTypes.FETCH_ALL_REQUEST_FOR_INFORMATION:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case RequestForInformationActionTypes.FETCH_ALL_REQUEST_FOR_INFORMATION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case RequestForInformationActionTypes.FETCH_ALL_REQUEST_FOR_INFORMATION_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case RequestForInformationActionTypes.FETCH_ALL_REQUEST_FOR_INFORMATION_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case RequestForInformationActionTypes.FETCH_ONE_REQUEST_FOR_INFORMATION:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case RequestForInformationActionTypes.FETCH_ONE_REQUEST_FOR_INFORMATION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case RequestForInformationActionTypes.FETCH_ONE_REQUEST_FOR_INFORMATION_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case RequestForInformationActionTypes.FETCH_ONE_REQUEST_FOR_INFORMATION_SUCCESS:
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

export default RequestForInformationReducer;
