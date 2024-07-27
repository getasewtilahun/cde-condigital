import { UserSeenStateTypes, UserSeenActionTypes } from "./UserSeen.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: UserSeenStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const UserSeenReducer = (
  state: UserSeenStateTypes = INITIAL_STATE,
  action: any
): UserSeenStateTypes => {
  switch (action.type) {
    case UserSeenActionTypes.FETCH_ALL_USER_SEEN:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case UserSeenActionTypes.FETCH_ALL_USER_SEEN_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case UserSeenActionTypes.FETCH_ALL_USER_SEEN_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case UserSeenActionTypes.FETCH_ALL_USER_SEEN_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case UserSeenActionTypes.SET_USER_SEEN_SUCCESS:
      let data = state.fetchAll.payload;

      let index = data.findIndex(
        (e) =>
          e.type === action.payload.type &&
          e.parent_id === action.payload.parent_id
      );
      if (index !== -1) data.splice(index, 1, action.payload);
      else data.push(action.payload);
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: data,
        },
      };

    case UserSeenActionTypes.FETCH_ONE_USER_SEEN:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case UserSeenActionTypes.FETCH_ONE_USER_SEEN_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case UserSeenActionTypes.FETCH_ONE_USER_SEEN_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case UserSeenActionTypes.FETCH_ONE_USER_SEEN_SUCCESS:
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

export default UserSeenReducer;
