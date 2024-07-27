import { UserControlActionTypes } from "./UserControl.type";

/**
 * Fetch All UserControl
 *
 * @param payload
 */
export const fetchAllUserControl = (payload?: any) => ({
  type: UserControlActionTypes.FETCH_ALL_USER_CONTROL,
  payload: payload,
});

/**
 * Fetch All UserControl
 *
 * @param payload
 */
export const fetchOneUserControl = (payload?: any) => ({
  type: UserControlActionTypes.FETCH_ONE_USER_CONTROL,
  payload: payload,
});

/**
 * Reset Fetch UserControl State
 *
 * @param payload
 */
export const fetchAllUserControlReset = (payload?: any) => ({
  type: UserControlActionTypes.FETCH_ALL_USER_CONTROL_RESET,
  payload: payload,
});
