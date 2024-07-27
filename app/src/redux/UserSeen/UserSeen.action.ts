import { UserSeenActionTypes } from "./UserSeen.type";

/**
 * Fetch All UserSeen
 *
 * @param payload
 */
export const fetchAllUserSeen = (payload?: any) => ({
  type: UserSeenActionTypes.FETCH_ALL_USER_SEEN,
  payload: payload,
});

/**
 * Fetch Paged UserSeen
 *
 * @param payload
 */
export const setUserSeen = (payload?: any) => ({
  type: UserSeenActionTypes.SET_USER_SEEN,
  payload: payload,
});

/**
 * Fetch All UserSeen
 *
 * @param payload
 */
export const fetchOneUserSeen = (payload?: any) => ({
  type: UserSeenActionTypes.FETCH_ONE_USER_SEEN,
  payload: payload,
});

/**
 * Reset Fetch UserSeen State
 *
 * @param payload
 */
export const fetchAllUserSeenReset = (payload?: any) => ({
  type: UserSeenActionTypes.FETCH_ALL_USER_SEEN_RESET,
  payload: payload,
});
