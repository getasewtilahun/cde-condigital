import { MoreOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Popover, Table, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../constants/Constants";
import { fetchAllUser } from "../../../redux/User/User.action";
import { User } from "../../../redux/User/User.type";
import { ErrorHandler } from "../../../utilities/utilities";
import { OpenNotification } from "../../common/Notification/Notification.component";
import ReloadButtonComponent from "../../common/ReloadButton/ReloadButton.component";
import {
  PUT,
  RESET,
  UserManagementPropType,
} from "./utils/UserManagement.util";
import AddUserComponent from "./components/Add/AddUser.component";
import EditUserComponent from "./components/Edit/EditUser.component";
import { fetchAllUserRole } from "../../../redux/UserRole/UserRole.action";
const { Search } = Input;

const UserManagementComponent: FC<UserManagementPropType> = ({
  fetchUsers,
  users,
  fetchUserRoles,
}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchUsers({ filter: "all" });
    return () => {
      fetchUsers();
    };
  }, [fetchUsers]);

  useEffect(() => {
    fetchUserRoles();
  }, [fetchUserRoles]);

  const onUpgrade = (user: User) => {
    setLoading(true);
    PUT({ is_super_user: !user.is_super_user, id: user.id })
      .then(() => {
        fetchUsers({ filter: "all" });
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, "User Upgraded", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Upgrade",
            e.message
          )
        );
      });
  };

  const onActivate = (user: User) => {
    setLoading(true);
    PUT({
      status: user.status === "Activated" ? "Terminated" : "Activated",
      id: user.id,
    })
      .then(() => {
        fetchUsers({ filter: "all" });
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, "User Upgraded", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Upgrade",
            e.message
          )
        );
      });
  };

  const onReset = (user: User) => {
    setLoading(true);
    RESET({
      user_id: user.id,
    })
      .then(() => {
        fetchUsers({ filter: "all" });
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, "User Reset successful", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to reset user",
            e.message
          )
        );
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-6">
          <div style={{ float: "left" }}>
            <Search
              placeholder="Search ..."
              onSearch={(val: any) => fetchUsers({ filter: "all", key: val })}
              style={{ width: "100%" }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div style={{ float: "right" }}>
            <AddUserComponent />
            <ReloadButtonComponent
              onClick={() => fetchUsers({ filter: "all" })}
            />
          </div>
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <Table
            loading={users.isPending}
            dataSource={users.payload.map((e, index) => ({
              ...e,
              key: index + 1,
            }))}
            columns={[
              {
                title: "No",
                key: "no",
                dataIndex: "key",
              },
              {
                title: "Name",
                key: "name",
                dataIndex: "full_name",
              },
              {
                title: "Email",
                key: "email",
                dataIndex: "email",
              },

              {
                title: "Organization",
                key: "organization",
                dataIndex: "organization",
              },
              {
                title: "Role",
                key: "role",
                render: (value: any, record: any) => record.user_role?.name,
                filters: [
                  ...new Set(users.payload.map((e) => e.user_role?.name)),
                ].map((e) => ({
                  text: e,
                  value: e,
                })),
                onFilter: (value: any, record: any) => record.user_role?.name === value,
              },
              {
                title: "Type",
                key: "type",
                render: (value: any, record: any) =>
                  record.is_super_user ? "Super-User" : "Normal",
                filters: [
                  {
                    text: "Super-User",
                    value: true,
                  },
                  {
                    text: "Normal",
                    value: false,
                  },
                ],
                onFilter: (value: any, record: any) => record.is_super_user === value,
              },
              {
                title: "Status",
                key: "status",
                render: (value: any, record: any) => (
                  <Tag color={record.status === "Activated" ? "green" : "red"}>
                    {record.status}
                  </Tag>
                ),
              },
              {
                title: "Action",
                render: (value: any, record: any) => (
                  <Popover
                    placement="rightTop"
                    overlayClassName="action-popover"
                    trigger="focus"
                    content={
                      <div className="d-flex flex-column">
                        <Popconfirm
                          title={`Are you sure to ${record.status === "Activated" ? "Terminate" : "Activate"} this User?`}

                          onConfirm={() => onActivate(record)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            danger={record.status === "Activated"}
                            loading={loading}
                            type="text"
                          >
                            {record.status === "Activated"
                              ? "Terminate"
                              : "Activate"}
                          </Button>
                        </Popconfirm>
                        <Popconfirm
                          title={`Are you sure to set user to ${record.is_super_user ? "Normal" : "Super-User"
                            } ?`}
                          onConfirm={() => onUpgrade(record)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button loading={loading} type="text">
                            {record.is_super_user
                              ? "Set Normal"
                              : "Set Super-User"}
                          </Button>
                        </Popconfirm>
                        <Popconfirm
                          title={`Do you want to reset this User Password?`}
                          onConfirm={() => onReset(record)}
                          okText="Reset"
                          cancelText="No"
                        >
                          <Button loading={loading} type="text">
                            Reset
                          </Button>
                        </Popconfirm>
                        <EditUserComponent data={record} />
                      </div>
                    }
                  >
                    <Button
                      icon={<MoreOutlined />}
                      className="btn-outline-secondary border-0"
                    ></Button>
                  </Popover>
                ),
              },
            ]}
          />
        </div>
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
  users: state.user.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
  fetchUserRoles: (action: any) => dispatch(fetchAllUserRole(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagementComponent);
