import { User } from "../User/User.type";
import { ApiCallState, PagedData } from "../Utils";

export type CommunicationMessage = {
  id: number;
  communication_group_id: number;
  user_id: number;
  text: string;
  document_url: string;
  date: Date;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  user: User;
};

export type CommunicationMessageStateTypes = {
  fetchPaged: ApiCallState<PagedData<CommunicationMessage[]>>;
  search: ApiCallState<PagedData<CommunicationMessage[]>>;
};

export const CommunicationMessageActionTypes = {
  FETCH_PAGED_COMMUNICATION_MESSAGE: "FETCH_PAGED_COMMUNICATION_MESSAGE",
  FETCH_PAGED_COMMUNICATION_MESSAGE_RESET:
    "FETCH_PAGED_COMMUNICATION_MESSAGE_RESET",
  FETCH_PAGED_COMMUNICATION_MESSAGE_FAILURE:
    "FETCH_PAGED_COMMUNICATION_MESSAGE_FAILURE",
  FETCH_PAGED_COMMUNICATION_MESSAGE_SUCCESS:
    "FETCH_PAGED_COMMUNICATION_MESSAGE_SUCCESS",

  SEARCH_COMMUNICATION_MESSAGE: "SEARCH_COMMUNICATION_MESSAGE",
  SEARCH_COMMUNICATION_MESSAGE_RESET: "SEARCH_COMMUNICATION_MESSAGE_RESET",
  SEARCH_COMMUNICATION_MESSAGE_FAILURE: "SEARCH_COMMUNICATION_MESSAGE_FAILURE",
  SEARCH_COMMUNICATION_MESSAGE_SUCCESS: "SEARCH_COMMUNICATION_MESSAGE_SUCCESS",
};
