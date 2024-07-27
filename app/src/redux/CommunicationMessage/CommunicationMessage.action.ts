import { CommunicationMessageActionTypes } from "./CommunicationMessage.type";

/**
 * Fetch Paged CommunicationMessage
 *
 * @param payload
 */
export const fetchPagedCommunicationMessage = (payload?: any) => ({
  type: CommunicationMessageActionTypes.FETCH_PAGED_COMMUNICATION_MESSAGE,
  payload: payload,
});

/**
 * Reset Fetch CommunicationMessage State
 *
 * @param payload
 */
export const fetchPagedCommunicationMessageReset = (payload?: any) => ({
  type: CommunicationMessageActionTypes.FETCH_PAGED_COMMUNICATION_MESSAGE_RESET,
  payload: payload,
});

/**
 * Search CommunicationMessage
 *
 * @param payload
 */
export const searchCommunicationMessage = (payload?: any) => ({
  type: CommunicationMessageActionTypes.SEARCH_COMMUNICATION_MESSAGE,
  payload: payload,
});

/**
 * Reset Search CommunicationMessage State
 *
 * @param payload
 */
export const searchCommunicationMessageReset = (payload?: any) => ({
  type: CommunicationMessageActionTypes.SEARCH_COMMUNICATION_MESSAGE_RESET,
  payload: payload,
});
