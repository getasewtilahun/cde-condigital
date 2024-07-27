import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";
import { API_BASE_URI } from "../ApiCall";
import { UserActionTypes } from "./User.type";

export function* fetchAllUser(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/user`);
    yield put({
      type: UserActionTypes.FETCH_ALL_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserActionTypes.FETCH_ALL_USER_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAssignedUser(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/user/assigned?project_id=${action.payload?.project_id}`
    );
    yield put({
      type: UserActionTypes.FETCH_ASSIGNED_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserActionTypes.FETCH_ASSIGNED_USER_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneUser(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/user/${action.payload}`);
    yield put({
      type: UserActionTypes.FETCH_ONE_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserActionTypes.FETCH_ONE_USER_FAILURE,
      payload: error,
    });
  }
}

export function* fetchLoggedInUser(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/user/logged-in`);
    yield put({
      type: UserActionTypes.FETCH_LOGGED_IN_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserActionTypes.FETCH_LOGGED_IN_USER_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllUser() {
  yield takeLatest(UserActionTypes.FETCH_ALL_USER, fetchAllUser);
}

export function* watcherFetchAssignedUser() {
  yield takeLatest(UserActionTypes.FETCH_ASSIGNED_USER, fetchAssignedUser);
}

export function* watcherFetchOneUser() {
  yield takeLatest(UserActionTypes.FETCH_ONE_USER, fetchOneUser);
}

export function* watcherFetchLoggedInUser() {
  yield takeLatest(UserActionTypes.FETCH_LOGGED_IN_USER, fetchLoggedInUser);
}
