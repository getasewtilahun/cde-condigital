import { RequestForInformationActionTypes } from "./RequestForInformation.type";

/**
 * Fetch All RequestForInformation
 *
 * @param payload
 */
export const fetchAllRequestForInformation = (payload?: any) => ({
  type: RequestForInformationActionTypes.FETCH_ALL_REQUEST_FOR_INFORMATION,
  payload: payload,
});

/**
 * Fetch All RequestForInformation
 *
 * @param payload
 */
export const fetchOneRequestForInformation = (payload?: any) => ({
  type: RequestForInformationActionTypes.FETCH_ONE_REQUEST_FOR_INFORMATION,
  payload: payload,
});

/**
 * Reset Fetch RequestForInformation State
 *
 * @param payload
 */
export const fetchAllRequestForInformationReset = (payload?: any) => ({
  type: RequestForInformationActionTypes.FETCH_ALL_REQUEST_FOR_INFORMATION_RESET,
  payload: payload,
});
