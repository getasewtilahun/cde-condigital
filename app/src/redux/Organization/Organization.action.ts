import { OrganizationActionTypes } from "./Organization.type";

/**
 * Fetch All Organization
 *
 * @param payload
 */
export const fetchAllOrganization = (payload?: any) => ({
  type: OrganizationActionTypes.FETCH_ALL_ORGANIZATION,
  payload: payload,
});

/**
 * Fetch Paged Organization
 *
 * @param payload
 */
export const fetchPagedOrganization = (payload?: any) => ({
  type: OrganizationActionTypes.FETCH_PAGED_ORGANIZATION,
  payload: payload,
});

/**
 * Fetch One Organization
 *
 * @param payload
 */
export const fetchOneOrganization = (payload?: any) => ({
  type: OrganizationActionTypes.FETCH_ONE_ORGANIZATION,
  payload: payload,
});

/**
 * Reset Fetch Organization State
 *
 * @param payload
 */
export const fetchAllOrganizationReset = (payload?: any) => ({
  type: OrganizationActionTypes.FETCH_ALL_ORGANIZATION_RESET,
  payload: payload,
});
