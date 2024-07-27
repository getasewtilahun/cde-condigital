import { InitPagedData } from "../Utils";
import { OrganizationStateTypes, OrganizationActionTypes } from "./Organization.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: OrganizationStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchPaged: resetApiCallState(InitPagedData),
};

const OrganizationReducer = (
  state: OrganizationStateTypes = INITIAL_STATE,
  action: any
): OrganizationStateTypes => {
  switch (action.type) {
    case OrganizationActionTypes.FETCH_ALL_ORGANIZATION:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case OrganizationActionTypes.FETCH_ALL_ORGANIZATION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case OrganizationActionTypes.FETCH_ALL_ORGANIZATION_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case OrganizationActionTypes.FETCH_ALL_ORGANIZATION_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case OrganizationActionTypes.FETCH_PAGED_ORGANIZATION:
      return {
        ...state,
        fetchPaged: {
          error: null,
          payload: InitPagedData,
          isPending: true,
          isSuccessful: false,
        },
      };
    case OrganizationActionTypes.FETCH_PAGED_ORGANIZATION_RESET:
      return {
        ...state,
        fetchPaged: resetApiCallState(InitPagedData),
      };
    case OrganizationActionTypes.FETCH_PAGED_ORGANIZATION_FAILURE:
      return {
        ...state,
        fetchPaged: {
          payload: InitPagedData,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case OrganizationActionTypes.FETCH_PAGED_ORGANIZATION_SUCCESS:
      return {
        ...state,
        fetchPaged: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case OrganizationActionTypes.FETCH_ONE_ORGANIZATION:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case OrganizationActionTypes.FETCH_ONE_ORGANIZATION_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case OrganizationActionTypes.FETCH_ONE_ORGANIZATION_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case OrganizationActionTypes.FETCH_ONE_ORGANIZATION_SUCCESS:
      return {
        ...state,
        fetchOne: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    default:
      return state;
  }
};

export default OrganizationReducer;
