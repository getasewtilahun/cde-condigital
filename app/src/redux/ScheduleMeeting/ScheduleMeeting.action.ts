import { ScheduleMeetingActionTypes } from "./ScheduleMeeting.type";

/**
 * Fetch All ScheduleMeeting
 *
 * @param payload
 */
export const fetchAllScheduleMeeting = (payload?: any) => ({
  type: ScheduleMeetingActionTypes.FETCH_ALL_SCHEDULE_MEETING,
  payload: payload,
});

/**
 * Fetch All ScheduleMeeting
 *
 * @param payload
 */
export const fetchOneScheduleMeeting = (payload?: any) => ({
  type: ScheduleMeetingActionTypes.FETCH_ONE_SCHEDULE_MEETING,
  payload: payload,
});

/**
 * Reset Fetch ScheduleMeeting State
 *
 * @param payload
 */
export const fetchAllScheduleMeetingReset = (payload?: any) => ({
  type: ScheduleMeetingActionTypes.FETCH_ALL_SCHEDULE_MEETING_RESET,
  payload: payload,
});
