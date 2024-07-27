import { ProjectActionTypes } from "./Project.type";

/**
 * Fetch All Project
 *
 * @param payload
 */
export const fetchAllProject = (payload?: any) => ({
  type: ProjectActionTypes.FETCH_ALL_PROJECT,
  payload: payload,
});

/**
 * Fetch Paged Project
 *
 * @param payload
 */
export const fetchPagedProject = (payload?: any) => ({
  type: ProjectActionTypes.FETCH_PAGED_PROJECT,
  payload: payload,
});

/**
 * Fetch One Project
 *
 * @param payload
 */
export const fetchOneProject = (payload?: any) => ({
  type: ProjectActionTypes.FETCH_ONE_PROJECT,
  payload: payload,
});

/**
 * Reset Fetch Project State
 *
 * @param payload
 */
export const fetchAllProjectReset = (payload?: any) => ({
  type: ProjectActionTypes.FETCH_ALL_PROJECT_RESET,
  payload: payload,
});
