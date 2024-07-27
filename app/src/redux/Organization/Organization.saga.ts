import axios from "axios";
import { takeLatest, put } from "redux-saga/effects";

import { API_BASE_URI } from "../ApiCall";
import { OrganizationActionTypes } from "./Organization.type";

export function* fetchAllOrganizations(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/organization?${query}`);
    yield put({
      type: OrganizationActionTypes.FETCH_ALL_ORGANIZATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: OrganizationActionTypes.FETCH_ALL_ORGANIZATION_FAILURE,
      payload: error,
    });
  }
}

export function* fetchPagedOrganizations(action: any): any {
  try {
    let query = "";
    if (action.payload) {
      const keys = Object.keys(action.payload);
      query = keys.map((key) => `${key}=${action.payload[key]}`).join("&");
    }
    const response = yield axios.get(`${API_BASE_URI}/organization?${query}`);
    yield put({
      type: OrganizationActionTypes.FETCH_PAGED_ORGANIZATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: OrganizationActionTypes.FETCH_PAGED_ORGANIZATION_FAILURE,
      payload: error,
    });
  }
}

export function* fetchOneOrganizations(action: any): any {
  console.log("action fetch one", action)
  try {
    const response = yield axios.get(
      `${API_BASE_URI}/organization/${action.payload}`
    );
    yield put({
      type: OrganizationActionTypes.FETCH_ONE_ORGANIZATION_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    yield put({
      type: OrganizationActionTypes.FETCH_ONE_ORGANIZATION_FAILURE,
      payload: error,
    });
  }
}

export function* watcherFetchAllOrganizations() {
  yield takeLatest(OrganizationActionTypes.FETCH_ALL_ORGANIZATION, fetchAllOrganizations);
}

export function* watcherFetchPagedOrganizations() {
  yield takeLatest(OrganizationActionTypes.FETCH_PAGED_ORGANIZATION, fetchPagedOrganizations);
}

export function* watcherFetchOneOrganizations() {
  yield takeLatest(OrganizationActionTypes.FETCH_ONE_ORGANIZATION, fetchOneOrganizations);
}
