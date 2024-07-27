import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { RequestForInformationStatusActionTypes } from "./RequestForInformationStatus.type";

export function* fetchAllRequestForInformationsStatus(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/request-for-information-status?project_id=${action.payload?.project_id}`);
    yield put({
      type: RequestForInformationStatusActionTypes.FETCH_ALL_REQUEST_FOR_INFORMATION_STATUS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: RequestForInformationStatusActionTypes.FETCH_ALL_REQUEST_FOR_INFORMATION_STATUS_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneRequestForInformationsStatus(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/request-for-information-status/${action.payload}`
    );
    yield put({
      type: RequestForInformationStatusActionTypes.FETCH_ONE_REQUEST_FOR_INFORMATION_STATUS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: RequestForInformationStatusActionTypes.FETCH_ONE_REQUEST_FOR_INFORMATION_STATUS_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllRequestForInformationsStatus() {
  yield takeLatest(RequestForInformationStatusActionTypes.FETCH_ALL_REQUEST_FOR_INFORMATION_STATUS, fetchAllRequestForInformationsStatus);
}

export function* watcherFetchOneRequestForInformationsStatus() {
  yield takeLatest(RequestForInformationStatusActionTypes.FETCH_ONE_REQUEST_FOR_INFORMATION_STATUS, fetchOneRequestForInformationsStatus);
}
