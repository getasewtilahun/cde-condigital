import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { DocumentAssignmentActionTypes } from "./DocumentAssignment.type";

export function* fetchAllDocumentAssignments(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/document-assignment?project_id=${action.payload?.project_id}&type=${action.payload?.type}&category=${action.payload?.category}&folder=${action.payload?.folder}&sub_folder=${action.payload?.sub_folder}`
    );
    yield put({
      type: DocumentAssignmentActionTypes.FETCH_ALL_DOCUMENT_ASSIGNMENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: DocumentAssignmentActionTypes.FETCH_ALL_DOCUMENT_ASSIGNMENT_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneDocumentAssignments(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/document-assignment/${action.payload}`
    );
    yield put({
      type: DocumentAssignmentActionTypes.FETCH_ONE_DOCUMENT_ASSIGNMENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: DocumentAssignmentActionTypes.FETCH_ONE_DOCUMENT_ASSIGNMENT_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllDocumentAssignments() {
  yield takeLatest(
    DocumentAssignmentActionTypes.FETCH_ALL_DOCUMENT_ASSIGNMENT,
    fetchAllDocumentAssignments
  );
}

export function* watcherFetchOneDocumentAssignments() {
  yield takeLatest(
    DocumentAssignmentActionTypes.FETCH_ONE_DOCUMENT_ASSIGNMENT,
    fetchOneDocumentAssignments
  );
}
