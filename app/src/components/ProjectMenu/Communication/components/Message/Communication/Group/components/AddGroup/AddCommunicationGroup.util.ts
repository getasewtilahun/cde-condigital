import axios from "axios";
import { API_BASE_URI } from "../../../../../../../../../redux/ApiCall";
import { CommunicationGroup } from "../../../../../../../../../redux/CommunicationGroup/CommunicationGroup.type";
import { ApiCallState } from "../../../../../../../../../redux/Utils";

export type AddCommunicationGroupPropType = {
  fetchAllCommunicationGroup: Function;
  communication_groups: ApiCallState<CommunicationGroup[]>;
};

export const sendData = (data: any) =>
  axios.post(API_BASE_URI + "/communication-group", data);
