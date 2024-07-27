import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { CommunicationGroupActionTypes } from "./CommunicationGroup.type";

export function* fetchAllCommunicationGroups(action: any): any {
  try {
    let query = "";

    if (action.payload && Object.keys(action.payload).length > 0) {
      query =
        "?" +
        Object.keys(action.payload)
          .map((key) => `${key}=${action.payload[key]}`)
          .join("&");
    }

    const response = yield axios.get(
      `${API_BASE_URI}/communication-group${query}`
    );
    yield put({
      type: CommunicationGroupActionTypes.FETCH_ALL_COMMUNICATION_GROUP_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CommunicationGroupActionTypes.FETCH_ALL_COMMUNICATION_GROUP_FAILURE,
      payload: error,
    });
  }
}

export function* fetchAllCommunicationGroupUsers(action: any): any {
  try {
    let query = "";

    if (action.payload && Object.keys(action.payload).length > 0) {
      query =
        "?" +
        Object.keys(action.payload)
          .map((key) => `${key}=${action.payload[key]}`)
          .join("&");
    }

    const response = yield axios.get(
      `${API_BASE_URI}/communication-group/users${query}`
    );
    yield put({
      type: CommunicationGroupActionTypes.FETCH_ALL_COMMUNICATION_GROUP_USER_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: CommunicationGroupActionTypes.FETCH_ALL_COMMUNICATION_GROUP_USER_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllCommunicationGroups() {
  yield takeLatest(
    CommunicationGroupActionTypes.FETCH_ALL_COMMUNICATION_GROUP,
    fetchAllCommunicationGroups
  );
}

export function* watcherFetchAllCommunicationGroupUsers() {
  yield takeLatest(
    CommunicationGroupActionTypes.FETCH_ALL_COMMUNICATION_GROUP_USER,
    fetchAllCommunicationGroupUsers
  );
}
