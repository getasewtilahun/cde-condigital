import { CommunicationGroupActionTypes } from "./CommunicationGroup.type";

/**
 * Fetch All CommunicationGroup
 *
 * @param payload
 */
export const fetchAllCommunicationGroup = (payload?: any) => ({
  type: CommunicationGroupActionTypes.FETCH_ALL_COMMUNICATION_GROUP,
  payload: payload,
});

/**
 * Reset Fetch CommunicationGroup State
 *
 * @param payload
 */
export const fetchAllCommunicationGroupReset = (payload?: any) => ({
  type: CommunicationGroupActionTypes.FETCH_ALL_COMMUNICATION_GROUP_RESET,
  payload: payload,
});

/**
 * Fetch All CommunicationGroupUser
 *
 * @param payload
 */
export const fetchAllCommunicationGroupUser = (payload?: any) => ({
  type: CommunicationGroupActionTypes.FETCH_ALL_COMMUNICATION_GROUP_USER,
  payload: payload,
});

/**
 * Reset Fetch CommunicationGroupUser State
 *
 * @param payload
 */
export const fetchAllCommunicationGroupUserReset = (payload?: any) => ({
  type: CommunicationGroupActionTypes.FETCH_ALL_COMMUNICATION_GROUP_USER_RESET,
  payload: payload,
});
