import {
  UserControlStateTypes,
  UserControlActionTypes,
} from "./UserControl.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: UserControlStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const UserControlReducer = (
  state: UserControlStateTypes = INITIAL_STATE,
  action: any
): UserControlStateTypes => {
  switch (action.type) {
    case UserControlActionTypes.FETCH_ALL_USER_CONTROL:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case UserControlActionTypes.FETCH_ALL_USER_CONTROL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case UserControlActionTypes.FETCH_ALL_USER_CONTROL_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case UserControlActionTypes.FETCH_ALL_USER_CONTROL_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case UserControlActionTypes.FETCH_ONE_USER_CONTROL:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case UserControlActionTypes.FETCH_ONE_USER_CONTROL_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case UserControlActionTypes.FETCH_ONE_USER_CONTROL_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case UserControlActionTypes.FETCH_ONE_USER_CONTROL_SUCCESS:
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

export default UserControlReducer;
