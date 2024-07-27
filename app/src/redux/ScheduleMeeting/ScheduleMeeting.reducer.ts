import { ScheduleMeetingStateTypes, ScheduleMeetingActionTypes } from "./ScheduleMeeting.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ScheduleMeetingStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
};

const ScheduleMeetingReducer = (
  state: ScheduleMeetingStateTypes = INITIAL_STATE,
  action: any
): ScheduleMeetingStateTypes => {
  switch (action.type) {
    case ScheduleMeetingActionTypes.FETCH_ALL_SCHEDULE_MEETING:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ScheduleMeetingActionTypes.FETCH_ALL_SCHEDULE_MEETING_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ScheduleMeetingActionTypes.FETCH_ALL_SCHEDULE_MEETING_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ScheduleMeetingActionTypes.FETCH_ALL_SCHEDULE_MEETING_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ScheduleMeetingActionTypes.FETCH_ONE_SCHEDULE_MEETING:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ScheduleMeetingActionTypes.FETCH_ONE_SCHEDULE_MEETING_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ScheduleMeetingActionTypes.FETCH_ONE_SCHEDULE_MEETING_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ScheduleMeetingActionTypes.FETCH_ONE_SCHEDULE_MEETING_SUCCESS:
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

export default ScheduleMeetingReducer;
