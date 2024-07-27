import { InitPagedData } from "./../Utils";
import { UserRoleStateTypes, UserRoleActionTypes } from "./UserRole.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: UserRoleStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchPaged: resetApiCallState(InitPagedData),
};

const UserRoleReducer = (
  state: UserRoleStateTypes = INITIAL_STATE,
  action: any
): UserRoleStateTypes => {
  switch (action.type) {
    case UserRoleActionTypes.FETCH_ALL_USER_ROLE:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case UserRoleActionTypes.FETCH_ALL_USER_ROLE_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case UserRoleActionTypes.FETCH_ALL_USER_ROLE_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case UserRoleActionTypes.FETCH_ALL_USER_ROLE_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case UserRoleActionTypes.FETCH_PAGED_USER_ROLE:
      return {
        ...state,
        fetchPaged: {
          error: null,
          payload: InitPagedData,
          isPending: true,
          isSuccessful: false,
        },
      };
    case UserRoleActionTypes.FETCH_PAGED_USER_ROLE_RESET:
      return {
        ...state,
        fetchPaged: resetApiCallState(InitPagedData),
      };
    case UserRoleActionTypes.FETCH_PAGED_USER_ROLE_FAILURE:
      return {
        ...state,
        fetchPaged: {
          payload: InitPagedData,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case UserRoleActionTypes.FETCH_PAGED_USER_ROLE_SUCCESS:
      return {
        ...state,
        fetchPaged: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case UserRoleActionTypes.FETCH_ONE_USER_ROLE:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case UserRoleActionTypes.FETCH_ONE_USER_ROLE_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case UserRoleActionTypes.FETCH_ONE_USER_ROLE_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case UserRoleActionTypes.FETCH_ONE_USER_ROLE_SUCCESS:
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

export default UserRoleReducer;
