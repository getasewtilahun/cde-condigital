import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { SettingActionTypes } from "./Setting.type";

export function* fetchAllSettings(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/document-name-setting?${query}`);
    yield put({
      type: SettingActionTypes.FETCH_ALL_SETTING_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: SettingActionTypes.FETCH_ALL_SETTING_FAILURE,
      payload: error,
    });
  }
}

export function* fetchPagedSettings(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/document-name-setting?${query}`);
    yield put({
      type: SettingActionTypes.FETCH_PAGED_SETTING_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: SettingActionTypes.FETCH_PAGED_SETTING_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneSettings(action: any): any {
  console.log("action fetch one", action)
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/document-name-setting/${action.payload}`
    );
    yield put({
      type: SettingActionTypes.FETCH_ONE_SETTING_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: SettingActionTypes.FETCH_ONE_SETTING_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllSettings() {
  yield takeLatest(SettingActionTypes.FETCH_ALL_SETTING, fetchAllSettings);
}

export function* watcherFetchPagedSettings() {
  yield takeLatest(SettingActionTypes.FETCH_PAGED_SETTING, fetchPagedSettings);
}

export function* watcherFetchOneSettings() {
  yield takeLatest(SettingActionTypes.FETCH_ONE_SETTING, fetchOneSettings);
}
