import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { CommunicationMessageActionTypes } from "./CommunicationMessage.type";

export function* fetchPagedCommunicationMessages(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query =
        "?" + keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }

    const response = yield axios.get(
      `${API_BASE_URI}/communication-message/paged${query}`
    );
    yield put({
      type: CommunicationMessageActionTypes.FETCH_PAGED_COMMUNICATION_MESSAGE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CommunicationMessageActionTypes.FETCH_PAGED_COMMUNICATION_MESSAGE_FAILURE,
      payload: error,
    });
  }
}

export function* searchCommunicationMessages(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query =
        "?" + keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }

    const response = yield axios.get(
      `${API_BASE_URI}/communication-message/search${query}`
    );
    yield put({
      type: CommunicationMessageActionTypes.SEARCH_COMMUNICATION_MESSAGE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CommunicationMessageActionTypes.SEARCH_COMMUNICATION_MESSAGE_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchPagedCommunicationMessages() {
  yield takeLatest(
    CommunicationMessageActionTypes.FETCH_PAGED_COMMUNICATION_MESSAGE,
    fetchPagedCommunicationMessages
  );
}

export function* watcherSearchCommunicationMessages() {
  yield takeLatest(
    CommunicationMessageActionTypes.SEARCH_COMMUNICATION_MESSAGE,
    searchCommunicationMessages
  );
}
