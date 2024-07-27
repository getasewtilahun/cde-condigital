import { RequestForInformationStatusActionTypes } from "./RequestForInformationStatus.type";

/**
 * Fetch All RequestForInformation
 *
 * @param payload
 */
export const fetchAllRequestForInformationstatus = (payload?: any) => ({
  type: RequestForInformationStatusActionTypes.FETCH_ALL_REQUEST_FOR_INFORMATION_STATUS_SUCCESS,
  payload: payload,
});

/**
 * Fetch All RequestForInformation
 *
 * @param payload
 */
export const fetchOneRequestForInformationStatus = (payload?: any) => ({
  type: RequestForInformationStatusActionTypes.FETCH_ONE_REQUEST_FOR_INFORMATION_STATUS,
  payload: payload,
});

/**
 * Reset Fetch RequestForInformation State
 *
 * @param payload
 */
export const fetchAllRequestForInformationStatusReset = (payload?: any) => ({
  type: RequestForInformationStatusActionTypes.FETCH_ALL_REQUEST_FOR_INFORMATION_STATUS_RESET,
  payload: payload,
});
