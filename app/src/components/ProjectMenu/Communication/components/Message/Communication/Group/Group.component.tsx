import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Menu, Skeleton } from "antd";
import { FC, useEffect } from "react";
import { connect } from "react-redux";
import { fetchAllCommunicationGroup } from "../../../../../../../redux/CommunicationGroup/CommunicationGroup.action";
import HeaderComponent from "./components/Header/Header.component";
import { GroupPropType, parseUnseenMessages } from "./Group.util";

const GroupComponent: FC<GroupPropType> = ({
  fetchAllCommunicationGroup,
  communication_groups,
  selectedCommunicationGroupAction,
  onGroupSelect,
}) => {
  const [selected_group, setSelectedGroup] = selectedCommunicationGroupAction;

  useEffect(() => {
    fetchAllCommunicationGroup();
  }, []);

  useEffect(() => {
    if (!communication_groups.isPending && communication_groups.error)
      setTimeout(() => {
        fetchAllCommunicationGroup();
      }, 3000);

    if (!communication_groups.isPending && communication_groups.isSuccessful) {
    }
  }, [communication_groups]);

  const onGroupSelected = (group_id: number) => {
    const group = communication_groups.payload?.find((e: any) => e.id === group_id);

    if (group) onGroupSelect(group);
  };

  return (
    <>
      {/* Top Bar */}
      <HeaderComponent />

      {/* Group List */}
      <div
        className="border-right"
        style={{
          overflowY: "auto",
          height: 582,
          msOverflowStyle: "none",
        }}
      >
        {communication_groups.isPending ? (
          <div className="px-2 pt-2">
            <Skeleton active avatar paragraph={{ rows: 1 }} key={1} />
            <Skeleton active avatar paragraph={{ rows: 1 }} key={3} />
          </div>
        ) : (
          communication_groups?.payload.map((e: any) => (
            <Menu
              className="com-menu"
              selectedKeys={[selected_group ? `${selected_group.id}` : "0"]}
            >
              <Menu.Item key={e.id} onClick={() => onGroupSelected(e.id)}>
                <div className="d-flex justify-content-between">
                  <div>
                    <Avatar
                      icon={<UserOutlined style={{ fontSize: "20px" }} />}
                      shape="circle"
                    />

                    <span className="ml-2">{e.name}</span>
                  </div>

                  <Badge
                    count={parseUnseenMessages(e)}
                    style={{
                      marginTop: 15,
                    }}
                  />
                </div>
              </Menu.Item>
            </Menu>
          ))
        )}
      </div>
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  communication_groups: state.communication_group.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllCommunicationGroup: () => dispatch(fetchAllCommunicationGroup()),
});

export default connect(mapStateToProps, mapDispatchToProps)(GroupComponent);
