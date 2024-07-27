import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { UserAssignmentActionTypes } from "./UserAssignment.type";

export function* fetchAllUserAssignments(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/user-assign`);
    yield put({
      type: UserAssignmentActionTypes.FETCH_ALL_USER_ASSIGNMENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserAssignmentActionTypes.FETCH_ALL_USER_ASSIGNMENT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneUserAssignments(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/user-assign/${action.payload}`
    );
    yield put({
      type: UserAssignmentActionTypes.FETCH_ONE_USER_ASSIGNMENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: UserAssignmentActionTypes.FETCH_ONE_USER_ASSIGNMENT_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllUserAssignments() {
  yield takeLatest(UserAssignmentActionTypes.FETCH_ALL_USER_ASSIGNMENT, fetchAllUserAssignments);
}

export function* watcherFetchOneUserAssignments() {
  yield takeLatest(UserAssignmentActionTypes.FETCH_ONE_USER_ASSIGNMENT, fetchOneUserAssignments);
}
