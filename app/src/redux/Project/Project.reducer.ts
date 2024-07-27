import { InitPagedData } from "./../Utils";
import { ProjectStateTypes, ProjectActionTypes } from "./Project.type";
import { resetApiCallState } from "../Utils";

const INITIAL_STATE: ProjectStateTypes = {
  fetchAll: resetApiCallState([]),
  fetchOne: resetApiCallState({}),
  fetchPaged: resetApiCallState(InitPagedData),
};

const ProjectReducer = (
  state: ProjectStateTypes = INITIAL_STATE,
  action: any
): ProjectStateTypes => {
  switch (action.type) {
    case ProjectActionTypes.FETCH_ALL_PROJECT:
      return {
        ...state,
        fetchAll: {
          error: null,
          payload: [],
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectActionTypes.FETCH_ALL_PROJECT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ProjectActionTypes.FETCH_ALL_PROJECT_FAILURE:
      return {
        ...state,
        fetchAll: {
          payload: [],
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectActionTypes.FETCH_ALL_PROJECT_SUCCESS:
      return {
        ...state,
        fetchAll: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };
    case ProjectActionTypes.FETCH_PAGED_PROJECT:
      return {
        ...state,
        fetchPaged: {
          error: null,
          payload: InitPagedData,
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectActionTypes.FETCH_PAGED_PROJECT_RESET:
      return {
        ...state,
        fetchPaged: resetApiCallState(InitPagedData),
      };
    case ProjectActionTypes.FETCH_PAGED_PROJECT_FAILURE:
      return {
        ...state,
        fetchPaged: {
          payload: InitPagedData,
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectActionTypes.FETCH_PAGED_PROJECT_SUCCESS:
      return {
        ...state,
        fetchPaged: {
          error: null,
          isPending: false,
          isSuccessful: true,
          payload: action.payload,
        },
      };

    case ProjectActionTypes.FETCH_ONE_PROJECT:
      return {
        ...state,
        fetchOne: {
          error: null,
          payload: {},
          isPending: true,
          isSuccessful: false,
        },
      };
    case ProjectActionTypes.FETCH_ONE_PROJECT_RESET:
      return {
        ...state,
        fetchAll: resetApiCallState([]),
      };
    case ProjectActionTypes.FETCH_ONE_PROJECT_FAILURE:
      return {
        ...state,
        fetchOne: {
          payload: {},
          isPending: false,
          isSuccessful: false,
          error: action.payload,
        },
      };
    case ProjectActionTypes.FETCH_ONE_PROJECT_SUCCESS:
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

export default ProjectReducer;
