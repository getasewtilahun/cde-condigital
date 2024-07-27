import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { UserRoleActionTypes } from "./UserRole.type";

export function* fetchAllUserRoles(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/user-role?${query}`);
    yield put({
      type: UserRoleActionTypes.FETCH_ALL_USER_ROLE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserRoleActionTypes.FETCH_ALL_USER_ROLE_FAILURE,
      payload: error,
    });
  }
}

export function* fetchPagedUserRoles(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/user-role?${query}`);
    yield put({
      type: UserRoleActionTypes.FETCH_PAGED_USER_ROLE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserRoleActionTypes.FETCH_PAGED_USER_ROLE_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneUserRoles(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/user-role/${action.payload}`
    );
    yield put({
      type: UserRoleActionTypes.FETCH_ONE_USER_ROLE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserRoleActionTypes.FETCH_ONE_USER_ROLE_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllUserRoles() {
  yield takeLatest(UserRoleActionTypes.FETCH_ALL_USER_ROLE, fetchAllUserRoles);
}

export function* watcherFetchPagedUserRoles() {
  yield takeLatest(
    UserRoleActionTypes.FETCH_PAGED_USER_ROLE,
    fetchPagedUserRoles
  );
}

export function* watcherFetchOneUserRoles() {
  yield takeLatest(UserRoleActionTypes.FETCH_ONE_USER_ROLE, fetchOneUserRoles);
}
