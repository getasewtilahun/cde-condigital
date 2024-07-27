import { UserAssignmentStateTypes, UserAssignmentActionTypes } from "./UserAssignment.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: UserAssignmentStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const UserAssignmentReducer = (
  state: UserAssignmentStateTypes = INITIAL_STATE,
  action: any
): UserAssignmentStateTypes => {
  switch (action.type) {
    case UserAssignmentActionTypes.FETCH_ALL_USER_ASSIGNMENT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case UserAssignmentActionTypes.FETCH_ALL_USER_ASSIGNMENT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case UserAssignmentActionTypes.FETCH_ALL_USER_ASSIGNMENT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case UserAssignmentActionTypes.FETCH_ALL_USER_ASSIGNMENT_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case UserAssignmentActionTypes.FETCH_ONE_USER_ASSIGNMENT:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case UserAssignmentActionTypes.FETCH_ONE_USER_ASSIGNMENT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case UserAssignmentActionTypes.FETCH_ONE_USER_ASSIGNMENT_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case UserAssignmentActionTypes.FETCH_ONE_USER_ASSIGNMENT_SUCCESS:
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

export default UserAssignmentReducer;
