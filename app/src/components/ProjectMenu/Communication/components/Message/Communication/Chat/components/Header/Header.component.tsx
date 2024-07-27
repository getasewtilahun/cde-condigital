import { CloseCircleOutlined } from "@ant-design/icons";
import { Avatar, Button, Tag, Tooltip } from "antd";
import { FC } from "react";
import { connect } from "react-redux";
import { CommunicationGroupUser } from "../../../../../../../../../redux/CommunicationGroup/CommunicationGroup.type";
import { getUserData } from "../../../../../../../../../utilities/utilities";
import SearchComponent from "../../../Search/Search.component";

import EditCommunicationGroupComponent from "../EditMembers/EditCommunicationGroup";

const HeaderComponent: FC<{
  selectedGroupAction: any;
  closeGroup: Function;
}> = ({ selectedGroupAction, closeGroup }) => {
  const [selected_communication_group, setSelectedCommunicationGroup] =
    selectedGroupAction;

  return (
    <div className="border-bottom border-right px-3 py-2 d-flex flex-row align-items-center justify-content-between">
      <div>
        <h6>{selected_communication_group?.name}</h6>

        <Avatar.Group
          maxCount={4}
          maxPopoverTrigger="click"
          maxStyle={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
        >
          {selected_communication_group?.communication_group_users.map(
            (e: CommunicationGroupUser, idx: number) => (
              <Tag className="text-grey f-11">
                {e?.user_id === getUserData().id ? "You" : e?.user?.full_name}
              </Tag>
            )
          )}
        </Avatar.Group>
      </div>

      <div>
        <Tooltip title={"Press Esc to close"} placement="leftTop">
          <Button
            icon={<CloseCircleOutlined />}
            className="btn-outline-secondary"
            onClick={() => closeGroup()}
          ></Button>
        </Tooltip>

        {getUserData().id === selected_communication_group?.user_id && (
          <EditCommunicationGroupComponent
            selected_group={selected_communication_group}
          />
        )}

        <SearchComponent
          selected_communication_group={selected_communication_group}
        />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);
