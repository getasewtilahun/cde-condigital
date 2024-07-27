import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { UserSeenActionTypes } from "./UserSeen.type";

export function* fetchAllUserSeens(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/user-seen?${query}`);
    yield put({
      type: UserSeenActionTypes.FETCH_ALL_USER_SEEN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserSeenActionTypes.FETCH_ALL_USER_SEEN_FAILURE,
      payload: error,
    });
  }
}

export function* SetUserSeens(action: any): any {
  try {
    const response = yield axios.post(
      `${API_BASE_URI}/user-seen`,
      action.payload
    );
    yield put({
      type: UserSeenActionTypes.SET_USER_SEEN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserSeenActionTypes.SET_USER_SEEN_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneUserSeens(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/user-seen/${action.payload}`
    );
    yield put({
      type: UserSeenActionTypes.FETCH_ONE_USER_SEEN_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserSeenActionTypes.FETCH_ONE_USER_SEEN_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllUserSeens() {
  yield takeLatest(UserSeenActionTypes.FETCH_ALL_USER_SEEN, fetchAllUserSeens);
}

export function* watcherSetUserSeens() {
  yield takeLatest(UserSeenActionTypes.SET_USER_SEEN, SetUserSeens);
}

export function* watcherFetchOneUserSeens() {
  yield takeLatest(UserSeenActionTypes.FETCH_ONE_USER_SEEN, fetchOneUserSeens);
}
