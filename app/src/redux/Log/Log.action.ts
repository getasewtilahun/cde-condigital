import { LogActionTypes } from "./Log.type";

/**
 * Fetch All Log
 *
 * @param payload
 */
export const fetchAllLog = (payload?: any) => ({
  type: LogActionTypes.FETCH_ALL_LOG,
  payload: payload,
});

/**
 * Fetch Paged Log
 *
 * @param payload
 */
export const fetchPagedLog = (payload?: any) => ({
  type: LogActionTypes.FETCH_PAGED_LOG,
  payload: payload,
});

/**
 * Fetch All Log
 *
 * @param payload
 */
export const fetchOneLog = (payload?: any) => ({
  type: LogActionTypes.FETCH_ONE_LOG,
  payload: payload,
});

/**
 * Reset Fetch Log State
 *
 * @param payload
 */
export const fetchAllLogReset = (payload?: any) => ({
  type: LogActionTypes.FETCH_ALL_LOG_RESET,
  payload: payload,
});
