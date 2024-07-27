import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { LogActionTypes } from "./Log.type";

export function* fetchAllLogs(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/user-log?${query}`);
    yield put({
      type: LogActionTypes.FETCH_ALL_LOG_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: LogActionTypes.FETCH_ALL_LOG_FAILURE,
      payload: error,
    });
  }
}

export function* fetchPagedLogs(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/user-log?${query}`);
    yield put({
      type: LogActionTypes.FETCH_PAGED_LOG_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: LogActionTypes.FETCH_PAGED_LOG_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneLogs(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/user-log/${action.payload}`
    );
    yield put({
      type: LogActionTypes.FETCH_ONE_LOG_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: LogActionTypes.FETCH_ONE_LOG_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllLogs() {
  yield takeLatest(LogActionTypes.FETCH_ALL_LOG, fetchAllLogs);
}

export function* watcherFetchPagedLogs() {
  yield takeLatest(LogActionTypes.FETCH_PAGED_LOG, fetchPagedLogs);
}

export function* watcherFetchOneLogs() {
  yield takeLatest(LogActionTypes.FETCH_ONE_LOG, fetchOneLogs);
}
