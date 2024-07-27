import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { formatQuery } from "../Utils";
import { UserControlActionTypes } from "./UserControl.type";

export function* fetchAllUserControls(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/user-control?${query}`);
    yield put({
      type: UserControlActionTypes.FETCH_ALL_USER_CONTROL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserControlActionTypes.FETCH_ALL_USER_CONTROL_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneUserControls(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/user-control/user?${formatQuery(action)}`
    );
    yield put({
      type: UserControlActionTypes.FETCH_ONE_USER_CONTROL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserControlActionTypes.FETCH_ONE_USER_CONTROL_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllUserControls() {
  yield takeLatest(
    UserControlActionTypes.FETCH_ALL_USER_CONTROL,
    fetchAllUserControls
  );
}

export function* watcherFetchOneUserControls() {
  yield takeLatest(
    UserControlActionTypes.FETCH_ONE_USER_CONTROL,
    fetchOneUserControls
  );
}
