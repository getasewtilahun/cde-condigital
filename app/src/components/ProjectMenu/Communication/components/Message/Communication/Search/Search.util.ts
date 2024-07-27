import { CommunicationGroup } from "../../../../../../../redux/CommunicationGroup/CommunicationGroup.type";
import { CommunicationMessage } from "../../../../../../../redux/CommunicationMessage/CommunicationMessage.type";
import { ApiCallState, PagedData } from "../../../../../../../redux/Utils";

export type SearchPropType = {
  searchCommunicationMessage: Function;
  searchCommunicationMessageReset: Function;
  searched_messages: ApiCallState<PagedData<CommunicationMessage[]>>;
  selected_communication_group: CommunicationGroup;
};
