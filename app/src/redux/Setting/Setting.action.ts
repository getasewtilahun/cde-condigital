import { SettingActionTypes } from "./Setting.type";

/**
 * Fetch All Setting
 *
 * @param payload
 */
export const fetchAllSetting = (payload?: any) => ({
  type: SettingActionTypes.FETCH_ALL_SETTING,
  payload: payload,
});

/**
 * Fetch Paged Setting
 *
 * @param payload
 */
export const fetchPagedSetting = (payload?: any) => ({
  type: SettingActionTypes.FETCH_PAGED_SETTING,
  payload: payload,
});

/**
 * Fetch One Setting
 *
 * @param payload
 */
export const fetchOneSetting = (payload?: any) => ({
  type: SettingActionTypes.FETCH_ONE_SETTING,
  payload: payload,
});

/**
 * Reset Fetch Setting State
 *
 * @param payload
 */
export const fetchAllSettingReset = (payload?: any) => ({
  type: SettingActionTypes.FETCH_ALL_SETTING_RESET,
  payload: payload,
});
