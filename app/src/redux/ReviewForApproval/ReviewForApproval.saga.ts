import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { ReviewForApprovalActionTypes } from "./ReviewForApproval.type";

export function* fetchAllReviewForApprovals(action: any): any {
  try {
    const response = yield axios.get(`${API_BASE_URI}/review-for-approval?project_id=${action.payload?.project_id}`);
    yield put({
      type: ReviewForApprovalActionTypes.FETCH_ALL_REVIEW_FOR_APPROVAL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ReviewForApprovalActionTypes.FETCH_ALL_REVIEW_FOR_APPROVAL_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneReviewForApprovals(action: any): any {
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/review-for-approval/${action.payload}`
    );
    yield put({
      type: ReviewForApprovalActionTypes.FETCH_ONE_REVIEW_FOR_APPROVAL_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: ReviewForApprovalActionTypes.FETCH_ONE_REVIEW_FOR_APPROVAL_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllReviewForApprovals() {
  yield takeLatest(ReviewForApprovalActionTypes.FETCH_ALL_REVIEW_FOR_APPROVAL, fetchAllReviewForApprovals);
}

export function* watcherFetchOneReviewForApprovals() {
  yield takeLatest(ReviewForApprovalActionTypes.FETCH_ONE_REVIEW_FOR_APPROVAL, fetchOneReviewForApprovals);
}
