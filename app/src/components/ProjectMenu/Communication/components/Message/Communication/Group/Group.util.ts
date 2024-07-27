import moment from "moment";
import { CommunicationGroup } from "../../../../../../../redux/CommunicationGroup/CommunicationGroup.type";
import { ApiCallState } from "../../../../../../../redux/Utils";
import { getUserData } from "../../../../../../../utilities/utilities";

export type GroupPropType = {
  fetchAllCommunicationGroup: Function;
  communication_groups: ApiCallState<CommunicationGroup[]>;
  selectedCommunicationGroupAction: any;
  onGroupSelect: Function;
};

export const parseUnseenMessages = (group: CommunicationGroup) => {
  const { communication_group_users, communication_messages } = group;

  const user_id = getUserData().id;

  const group_user = communication_group_users.find(
    (e) => e.user_id === user_id
  );

  if (group_user) {
    return communication_messages.filter((e) =>
      moment(e.date).isAfter(moment(group_user.last_seen))
    ).length;
  } else {
    return communication_messages.length;
  }
};
