import { InitPagedData } from "../Utils";
import { SettingStateTypes, SettingActionTypes } from "./Setting.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: SettingStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchPaged: resetApiCallState(InitPagedData),
};

const SettingReducer = (
  state: SettingStateTypes = INITIAL_STATE,
  action: any
): SettingStateTypes => {
  switch (action.type) {
    case SettingActionTypes.FETCH_ALL_SETTING:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case SettingActionTypes.FETCH_ALL_SETTING_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case SettingActionTypes.FETCH_ALL_SETTING_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case SettingActionTypes.FETCH_ALL_SETTING_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case SettingActionTypes.FETCH_PAGED_SETTING:
      return {
        ...state,
        fetchPaged: {
          error: null,
          payload: InitPagedData,
          isPending: true,
          isSuccessful: false,
        },
      };
    case SettingActionTypes.FETCH_PAGED_SETTING_RESET:
      return {
        ...state,
        fetchPaged: resetApiCallState(InitPagedData),
      };
    case SettingActionTypes.FETCH_PAGED_SETTING_FAILURE:
      return {
        ...state,
        fetchPaged: {
          payload: InitPagedData,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case SettingActionTypes.FETCH_PAGED_SETTING_SUCCESS:
      return {
        ...state,
        fetchPaged: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case SettingActionTypes.FETCH_ONE_SETTING:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case SettingActionTypes.FETCH_ONE_SETTING_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case SettingActionTypes.FETCH_ONE_SETTING_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case SettingActionTypes.FETCH_ONE_SETTING_SUCCESS:
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

export default SettingReducer;
