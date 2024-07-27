import { UserAssignmentActionTypes } from "./UserAssignment.type";

/**
 * Fetch All UserAssignment
 *
 * @param payload
 */
export const fetchAllUserAssignment = (payload?: any) => ({
  type: UserAssignmentActionTypes.FETCH_ALL_USER_ASSIGNMENT,
  payload: payload,
});

/**
 * Fetch All UserAssignment
 *
 * @param payload
 */
export const fetchOneUserAssignment = (payload?: any) => ({
  type: UserAssignmentActionTypes.FETCH_ONE_USER_ASSIGNMENT,
  payload: payload,
});

/**
 * Reset Fetch UserAssignment State
 *
 * @param payload
 */
export const fetchAllUserAssignmentReset = (payload?: any) => ({
  type: UserAssignmentActionTypes.FETCH_ALL_USER_ASSIGNMENT_RESET,
  payload: payload,
});
