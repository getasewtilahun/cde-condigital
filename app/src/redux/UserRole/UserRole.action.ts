import { UserRoleActionTypes } from "./UserRole.type";

/**
 * Fetch All UserRole
 *
 * @param payload
 */
export const fetchAllUserRole = (payload?: any) => ({
  type: UserRoleActionTypes.FETCH_ALL_USER_ROLE,
  payload: payload,
});

/**
 * Fetch Paged UserRole
 *
 * @param payload
 */
export const fetchPagedUserRole = (payload?: any) => ({
  type: UserRoleActionTypes.FETCH_PAGED_USER_ROLE,
  payload: payload,
});

/**
 * Fetch All UserRole
 *
 * @param payload
 */
export const fetchOneUserRole = (payload?: any) => ({
  type: UserRoleActionTypes.FETCH_ONE_USER_ROLE,
  payload: payload,
});

/**
 * Reset Fetch UserRole State
 *
 * @param payload
 */
export const fetchAllUserRoleReset = (payload?: any) => ({
  type: UserRoleActionTypes.FETCH_ALL_USER_ROLE_RESET,
  payload: payload,
});
