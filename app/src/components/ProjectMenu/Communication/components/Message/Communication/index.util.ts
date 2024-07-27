import axios from "axios";
import { API_BASE_URI } from "../../../../../../redux/ApiCall";
import { CommunicationMessage } from "../../../../../../redux/CommunicationMessage/CommunicationMessage.type";
import { User } from "../../../../../../redux/User/User.type";
import { ApiCallState, PagedData } from "../../../../../../redux/Utils";

export type CommunicationPropType = {
  communication_messages: ApiCallState<PagedData<CommunicationMessage[]>>;
  fetchPagedCommunicationMessage: Function;
  users: ApiCallState<User[]>;
  fetchAllUser: Function;
};

export const updateLastSeen = (data: any) =>
  axios.put(API_BASE_URI + "/communication-group/last-seen", data);
