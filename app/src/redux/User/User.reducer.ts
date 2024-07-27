import { UserStateTypes, UserActionTypes } from "./User.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: UserStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchLoggedIn: resetApiCallState({}),
  fetchFeature: resetApiCallState([]),
};

type UserAction = {
  type: UserActionTypes;
  payload?: any;
};

const UserReducer = (
  state: UserStateTypes = INITIAL_STATE,
  action: UserAction
): UserStateTypes => {
  switch (action.type) {
    case UserActionTypes.FETCH_ALL_USER:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case UserActionTypes.FETCH_ALL_USER_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case UserActionTypes.FETCH_ALL_USER_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case UserActionTypes.FETCH_ALL_USER_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case UserActionTypes.FETCH_ONE_USER:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {
            id: 0,
            name: "",
            email: "",
            full_name: "",
            roles: [],
            role_id: "",
            access_type: ""
          },
          isPending: true,
          isSuccessful: false,
        },
      };
    case UserActionTypes.FETCH_ONE_USER_RESET:
      return {
        ...state,
        fetchOne: resetApiCallState({}),
      };
    case UserActionTypes.FETCH_ONE_USER_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {
            id: 0,
            name: "",
            email: "",
            full_name: "",
            roles: [],
            role_id: "",
            access_type: ""
          },
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case UserActionTypes.FETCH_ONE_USER_SUCCESS:
      return {
        ...state,
        fetchOne: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case UserActionTypes.FETCH_LOGGED_IN_USER:
      return {
        ...state,
        fetchLoggedIn: {
          error: null,
          payload: {
            id: 0,
            name: "",
            email: "",
            full_name: "",
            roles: [],
            role_id: "",
            access_type: ""
          },
          isPending: true,
          isSuccessful: false,
        },
      };
    case UserActionTypes.FETCH_LOGGED_IN_USER_RESET:
      return {
        ...state,
        fetchLoggedIn: resetApiCallState({}),
      };
    case UserActionTypes.FETCH_LOGGED_IN_USER_FAILURE:
      return {
        ...state,
        fetchLoggedIn: {
          payload: {
            id: 0,
            name: "",
            email: "",
            full_name: "",
            roles: [],
            role_id: "",
            access_type: ""
          },
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case UserActionTypes.FETCH_LOGGED_IN_USER_SUCCESS:
      return {
        ...state,
        fetchLoggedIn: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case UserActionTypes.FETCH_FEATURE_USER:
      return {
        ...state,
        fetchFeature: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case UserActionTypes.FETCH_FEATURE_USER_RESET:
      return {
        ...state,
        fetchFeature: resetApiCallState([]),
      };
    case UserActionTypes.FETCH_FEATURE_USER_FAILURE:
      return {
        ...state,
        fetchFeature: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case UserActionTypes.FETCH_FEATURE_USER_SUCCESS:
      return {
        ...state,
        fetchFeature: {
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

export default UserReducer;
