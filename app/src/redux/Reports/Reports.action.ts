import { ReportsActionTypes } from "./Reports.type";

/**
 * Fetch All Reports
 *
 * @param payload
 */
export const fetchAllReports = (payload?: any) => ({
  type: ReportsActionTypes.FETCH_ALL_REPORTS,
  payload: payload,
});

/**
 * Fetch All Reports
 *
 * @param payload
 */
export const fetchOneReports = (payload?: any) => ({
  type: ReportsActionTypes.FETCH_ONE_REPORTS,
  payload: payload,
});

/**
 * Reset Fetch Reports State
 *
 * @param payload
 */
export const fetchAllReportsReset = (payload?: any) => ({
  type: ReportsActionTypes.FETCH_ALL_REPORTS_RESET,
  payload: payload,
});
