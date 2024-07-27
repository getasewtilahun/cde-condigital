import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ReportsActionTypes } from "./Reports.type";

export function* fetchAllReportss(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/report?project_id=${action.payload?.project_id}`);
    yield put({
      type: ReportsActionTypes.FETCH_ALL_REPORTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ReportsActionTypes.FETCH_ALL_REPORTS_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneReportss(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/report/${action.payload}`
    );
    yield put({
      type: ReportsActionTypes.FETCH_ONE_REPORTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ReportsActionTypes.FETCH_ONE_REPORTS_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllReportss() {
  yield takeLatest(ReportsActionTypes.FETCH_ALL_REPORTS, fetchAllReportss);
}

export function* watcherFetchOneReportss() {
  yield takeLatest(ReportsActionTypes.FETCH_ONE_REPORTS, fetchOneReportss);
}
