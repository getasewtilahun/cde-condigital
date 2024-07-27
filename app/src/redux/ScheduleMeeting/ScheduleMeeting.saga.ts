import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ScheduleMeetingActionTypes } from "./ScheduleMeeting.type";

export function* fetchAllScheduleMeetings(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/schedule-meeting?project_id=${action.payload?.project_id}`);
    yield put({
      type: ScheduleMeetingActionTypes.FETCH_ALL_SCHEDULE_MEETING_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ScheduleMeetingActionTypes.FETCH_ALL_SCHEDULE_MEETING_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneScheduleMeetings(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/schedule-meeting/${action.payload}`
    );
    yield put({
      type: ScheduleMeetingActionTypes.FETCH_ONE_SCHEDULE_MEETING_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ScheduleMeetingActionTypes.FETCH_ONE_SCHEDULE_MEETING_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllScheduleMeetings() {
  yield takeLatest(ScheduleMeetingActionTypes.FETCH_ALL_SCHEDULE_MEETING, fetchAllScheduleMeetings);
}

export function* watcherFetchOneScheduleMeetings() {
  yield takeLatest(ScheduleMeetingActionTypes.FETCH_ONE_SCHEDULE_MEETING, fetchOneScheduleMeetings);
}
