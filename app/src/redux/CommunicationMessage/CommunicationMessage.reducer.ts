import { InitPagedData, resetApiCallState } from "../Utils";
import {
  CommunicationMessageActionTypes,
  CommunicationMessageStateTypes,
} from "./CommunicationMessage.type";

const INITIAL_STATE: CommunicationMessageStateTypes = {
  fetchPaged: resetApiCallState(InitPagedData),
  search: resetApiCallState(InitPagedData),
};

const CommunicationMessageReducer = (
  state: CommunicationMessageStateTypes = INITIAL_STATE,
  action: any
): CommunicationMessageStateTypes => {
  switch (action.type) {
    case CommunicationMessageActionTypes.FETCH_PAGED_COMMUNICATION_MESSAGE:
      return {
        ...state,
        fetchPaged: {
          error: null,
          payload: { ...state.fetchPaged.payload },
          isPending: true,
          isSuccessful: false,
        },
      };
    case CommunicationMessageActionTypes.FETCH_PAGED_COMMUNICATION_MESSAGE_RESET:
      return {
        ...state,
        fetchPaged: {
          error: null,
          payload: InitPagedData,
          isPending: false,
          isSuccessful: false,
        },
      };
    case CommunicationMessageActionTypes.FETCH_PAGED_COMMUNICATION_MESSAGE_FAILURE:
      return {
        ...state,
        fetchPaged: {
          payload: { ...state.fetchPaged.payload },
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CommunicationMessageActionTypes.FETCH_PAGED_COMMUNICATION_MESSAGE_SUCCESS:
      return {
        ...state,
        fetchPaged: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    // --------------------------

    case CommunicationMessageActionTypes.SEARCH_COMMUNICATION_MESSAGE:
      return {
        ...state,
        search: {
          error: null,
          payload: { ...state.search.payload },
          isPending: true,
          isSuccessful: false,
        },
      };
    case CommunicationMessageActionTypes.SEARCH_COMMUNICATION_MESSAGE_RESET:
      return {
        ...state,
        search: {
          error: null,
          payload: InitPagedData,
          isPending: false,
          isSuccessful: false,
        },
      };
    case CommunicationMessageActionTypes.SEARCH_COMMUNICATION_MESSAGE_FAILURE:
      return {
        ...state,
        search: {
          payload: { ...state.search.payload },
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case CommunicationMessageActionTypes.SEARCH_COMMUNICATION_MESSAGE_SUCCESS:
      return {
        ...state,
        search: {
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

export default CommunicationMessageReducer;
