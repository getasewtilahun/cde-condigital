import { ReportsStateTypes, ReportsActionTypes } from "./Reports.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ReportsStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const ReportsReducer = (
  state: ReportsStateTypes = INITIAL_STATE,
  action: any
): ReportsStateTypes => {
  switch (action.type) {
    case ReportsActionTypes.FETCH_ALL_REPORTS:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ReportsActionTypes.FETCH_ALL_REPORTS_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ReportsActionTypes.FETCH_ALL_REPORTS_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ReportsActionTypes.FETCH_ALL_REPORTS_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ReportsActionTypes.FETCH_ONE_REPORTS:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ReportsActionTypes.FETCH_ONE_REPORTS_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ReportsActionTypes.FETCH_ONE_REPORTS_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ReportsActionTypes.FETCH_ONE_REPORTS_SUCCESS:
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

export default ReportsReducer;
