import { Col, Row } from "antd";
import { isNil, last } from "lodash";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { CommunicationSocketEvents } from "../../../../../../constants/Constants";
import { CommunicationGroup } from "../../../../../../redux/CommunicationGroup/CommunicationGroup.type";
import { fetchPagedCommunicationMessage } from "../../../../../../redux/CommunicationMessage/CommunicationMessage.action";
import { CommunicationMessage } from "../../../../../../redux/CommunicationMessage/CommunicationMessage.type";
import { fetchAllUser } from "../../../../../../redux/User/User.action";
import { socket } from "../../../../../../utilities/socket-client";
import { getUserData } from "../../../../../../utilities/utilities";
import ChatComponent from "./Chat/Chat.component";

import GroupComponent from "./Group/Group.component";
import { CommunicationPropType, updateLastSeen } from "./index.util";

const CommunicationPanel: FC<CommunicationPropType> = ({
  communication_messages,
  fetchPagedCommunicationMessage,
  users,
  fetchAllUser,
}) => {
  const [selected_communication_group, setSelectedCommunicationGroup] =
    useState<CommunicationGroup | null>(null);
  const [loaded_messages, setLoadedMessages] = useState<CommunicationMessage[]>(
    []
  );
  const [last_message, setLastMessage] = useState<CommunicationMessage | null>(
    null
  );

  // on connect
  useEffect(() => {
    socket.on("connect", () => {
      console.log("[Connected to server] ", socket?.id);
    });
  }, []);

  // On selected group changed
  useEffect(() => {
    fetchData();

    const keyDownHandler = (event: any) => {
      if (event.key === "Escape") {
        event.preventDefault();

        closeGroup();
      }
    };

    if (selected_communication_group) {
      document.addEventListener("keydown", keyDownHandler);
    } else {
      document.removeEventListener("keydown", keyDownHandler);
    }
    // clean up event listener
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [selected_communication_group]);

  useEffect(() => {
    if (
      !communication_messages.isPending &&
      communication_messages.payload.rows.length > 0 &&
      communication_messages.isSuccessful
    ) {
      const temp = [...loaded_messages, ...communication_messages.payload.rows];
      setLoadedMessages(temp);

      const _last_message = last(temp);

      if (_last_message) setLastMessage(_last_message);
    }
  }, [communication_messages]);

  useEffect(() => {
    if (selected_communication_group)
      socket.on(
        CommunicationSocketEvents.NEW_MESSAGE,
        (new_communication_message: CommunicationMessage) => {
          if (
            getUserData().id !== new_communication_message.user_id &&
            selected_communication_group &&
            selected_communication_group.id ===
            new_communication_message.communication_group_id
          ) {
            // if loaded messages is empty, then received message will be last message
            if (loaded_messages.length === 0)
              setLastMessage(new_communication_message);

            setLoadedMessages([
              { ...new_communication_message },
              ...loaded_messages,
            ]);
          }
        }
      );
  }, [selected_communication_group, loaded_messages]);

  useEffect(() => {
    if (last_message && selected_communication_group) {
      updateLastSeen({
        user_id: getUserData().id,
        communication_group_id: selected_communication_group.id,
        last_seen: last_message.date,
      });
    }
  }, [last_message]);

  const fetchData = () => {
    if (selected_communication_group)
      if (last_message) {
        fetchPagedCommunicationMessage({
          communication_group_id: selected_communication_group?.id,
          start_date: last_message.date,
        });
      } else {
        fetchPagedCommunicationMessage({
          communication_group_id: selected_communication_group?.id,
        });
      }

    if (users.payload.length === 0) fetchAllUser();
  };

  const handleGroupSelected = (group: CommunicationGroup) => {
    if (group.id !== selected_communication_group?.id)
      if (isNil(selected_communication_group)) {
        const room = `ROOM:${group.id}`;
        socket.emit(CommunicationSocketEvents.JOIN_ROOMS, room);

        setSelectedCommunicationGroup(group);
      } else {
        // Reset values from old group
        const old_room = `ROOM:${selected_communication_group.id}`;
        socket.emit(CommunicationSocketEvents.LEAVE_ROOM, old_room);

        setLoadedMessages([]);
        setLastMessage(null);

        // Connect to selected group
        const room = `ROOM:${group.id}`;
        socket.emit(CommunicationSocketEvents.JOIN_ROOMS, room);

        setSelectedCommunicationGroup(group);
      }
  };

  const closeGroup = () => {
    const room = `ROOM:${selected_communication_group?.id}`;
    socket.emit(CommunicationSocketEvents.LEAVE_ROOM, room);

    setSelectedCommunicationGroup(null);
    setLastMessage(null);
    setLoadedMessages([]);
  };

  return (
    <Row className="">
      <Col xs={3} sm={6} md={6} lg={6} xl={6} style={{ height: 650 }}>
        <GroupComponent
          selectedCommunicationGroupAction={[
            selected_communication_group,
            setSelectedCommunicationGroup,
          ]}
          onGroupSelect={(group: CommunicationGroup) =>
            handleGroupSelected(group)
          }
        />
      </Col>

      <Col xs={21} sm={18} md={18} lg={18} xl={18} style={{ height: 650 }}>
        <ChatComponent
          selectedCommunicationGroupAction={[
            selected_communication_group,
            setSelectedCommunicationGroup,
          ]}
          loadedMessagesAction={[loaded_messages, setLoadedMessages]}
          fetchData={fetchData}
          closeGroup={closeGroup}
        />
      </Col>
    </Row>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  users: state.user.fetchAll,
  communication_messages: state.communication_message.fetchPaged,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchPagedCommunicationMessage: (payload: any) =>
    dispatch(fetchPagedCommunicationMessage(payload)),
  fetchAllUser: () => dispatch(fetchAllUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CommunicationPanel);
