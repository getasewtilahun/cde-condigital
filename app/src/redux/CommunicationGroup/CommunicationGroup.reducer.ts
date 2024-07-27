import {
  CommunicationGroupStateTypes,
  CommunicationGroupActionTypes,
} from "./CommunicationGroup.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: CommunicationGroupStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchAllUsers: resetApiCallState([]),
};

const CommunicationGroupReducer = (
  state: CommunicationGroupStateTypes = INITIAL_STATE,
  action: any
): CommunicationGroupStateTypes => {
  switch (action.type) {
    case CommunicationGroupActionTypes.FETCH_ALL_COMMUNICATION_GROUP:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CommunicationGroupActionTypes.FETCH_ALL_COMMUNICATION_GROUP_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case CommunicationGroupActionTypes.FETCH_ALL_COMMUNICATION_GROUP_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CommunicationGroupActionTypes.FETCH_ALL_COMMUNICATION_GROUP_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    // -------------

    case CommunicationGroupActionTypes.FETCH_ALL_COMMUNICATION_GROUP_USER:
      return {
        ...state,
        fetchAllUsers: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case CommunicationGroupActionTypes.FETCH_ALL_COMMUNICATION_GROUP_USER_RESET:
      return {
        ...state,
        fetchAllUsers: resetApiCallState([]),
      };
    case CommunicationGroupActionTypes.FETCH_ALL_COMMUNICATION_GROUP_USER_FAILURE:
      return {
        ...state,
        fetchAllUsers: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CommunicationGroupActionTypes.FETCH_ALL_COMMUNICATION_GROUP_USER_SUCCESS:
      return {
        ...state,
        fetchAllUsers: {
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

export default CommunicationGroupReducer;
