import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { RequestForInformationActionTypes } from "./RequestForInformation.type";

export function* fetchAllRequestForInformations(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/request-for-information?project_id=${action.payload?.project_id}`);
    yield put({
      type: RequestForInformationActionTypes.FETCH_ALL_REQUEST_FOR_INFORMATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: RequestForInformationActionTypes.FETCH_ALL_REQUEST_FOR_INFORMATION_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneRequestForInformations(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/request-for-information/${action.payload}`
    );
    yield put({
      type: RequestForInformationActionTypes.FETCH_ONE_REQUEST_FOR_INFORMATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: RequestForInformationActionTypes.FETCH_ONE_REQUEST_FOR_INFORMATION_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllRequestForInformations() {
  yield takeLatest(RequestForInformationActionTypes.FETCH_ALL_REQUEST_FOR_INFORMATION, fetchAllRequestForInformations);
}

export function* watcherFetchOneRequestForInformations() {
  yield takeLatest(RequestForInformationActionTypes.FETCH_ONE_REQUEST_FOR_INFORMATION, fetchOneRequestForInformations);
}
