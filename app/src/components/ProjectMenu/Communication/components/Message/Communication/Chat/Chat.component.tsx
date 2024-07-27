import { Empty } from "antd";
import { isNil } from "lodash";
import { FC } from "react";
import { connect } from "react-redux";
import { ChatPropType } from "./Chat.util";

import { CommunicationMessage } from "../../../../../../../redux/CommunicationMessage/CommunicationMessage.type";
import HeaderComponent from "./components/Header/Header.component";
import InputComponent from "./components/Input/Input.component";
import MessageBoxComponent from "./components/MessageBox/MessageBox.component";

const ChatComponent: FC<ChatPropType> = ({
  selectedCommunicationGroupAction,
  loadedMessagesAction,
  fetchData,
  closeGroup,
}) => {
  const [selected_communication_group, setSelectedCommunicationGroup] =
    selectedCommunicationGroupAction;
  const [loaded_messages, setLoadedMessages] = loadedMessagesAction;

  const appendCommunicationMessage = (new_message: CommunicationMessage) => {
    setLoadedMessages([new_message, ...loaded_messages]);
  };

  return isNil(selected_communication_group) ? (
    <div
      style={{ height: 650 }}
      className="d-flex justify-content-center align-items-center"
    >
      <Empty description="Select a group to start messaging" />
    </div>
  ) : (
    <div className="d-flex flex-column justify-content-between">
      {/* Top Bar */}
      <HeaderComponent
        selectedGroupAction={[
          selected_communication_group,
          setSelectedCommunicationGroup,
        ]}
        closeGroup={closeGroup}
      />

      {/* Message */}
      <MessageBoxComponent messages={loaded_messages} fetchData={fetchData} />

      {/* Input  */}
      <InputComponent
        appendCommunicationMessage={appendCommunicationMessage}
        selected_communication_group={selected_communication_group}
      />
    </div>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ChatComponent);
