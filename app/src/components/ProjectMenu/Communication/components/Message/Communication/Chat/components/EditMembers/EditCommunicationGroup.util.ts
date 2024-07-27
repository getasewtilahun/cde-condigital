import axios from "axios";
import { API_BASE_URI } from "../../../../../../../../../redux/ApiCall";
import {
  CommunicationGroup,
  CommunicationGroupUser,
} from "../../../../../../../../../redux/CommunicationGroup/CommunicationGroup.type";
import { User } from "../../../../../../../../../redux/User/User.type";
import { ApiCallState } from "../../../../../../../../../redux/Utils";

export type EditCommunicationGroupPropType = {
  selected_group: CommunicationGroup;
  fetchAllCommunicationGroupUser: Function;
  fetchAllCommunicationGroupUserReset: Function;
  communication_group_users: ApiCallState<CommunicationGroupUser[]>;
  users: ApiCallState<User[]>;
};

export const sendData = (data: any) =>
  axios.put(API_BASE_URI + "/communication-group/users", data);

export const parseData = (
  communication_group_id: number,
  users_id: number[],
  communication_group_users: CommunicationGroupUser[]
) => {
  let parsed: any[] = [];

  users_id.forEach((user_id) => {
    const found = communication_group_users.find((e) => e.user_id === user_id);

    if (found) {
      parsed.push(found);
    } else {
      parsed.push({ communication_group_id, user_id });
    }
  });

  communication_group_users.forEach((communication_group_user) => {
    const found = users_id.find(
      (user_id) => user_id === communication_group_user.user_id
    );

    if (!found) {
      parsed.push({
        ...communication_group_user,
        deleted: true,
      });
    }
  });

  return parsed;
};
