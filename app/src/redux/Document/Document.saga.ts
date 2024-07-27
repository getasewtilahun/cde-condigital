import axios from "axios";
import { isNil, isObject } from "lodash";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { DocumentActionTypes } from "./Document.type";

export function* fetchAllDocuments(action?: any): any {
  try {
    // let queryData = action.payload;
    // const query =
    //   !isNil(queryData) && isObject(queryData)
    //     ? "?" +
    //       Object.keys(action.payload)
    //         .map((key) => `${key}=${queryData[key]}`)
    //         .join("&&")
    //     : "";

    let query = "";

    const response = yield axios.get(`${API_BASE_URI}/document${query}`);

    yield put({
      type: DocumentActionTypes.FETCH_ALL_DOCUMENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: DocumentActionTypes.FETCH_ALL_DOCUMENT_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllDocuments() {
  yield takeLatest(DocumentActionTypes.FETCH_ALL_DOCUMENT, fetchAllDocuments);
}
