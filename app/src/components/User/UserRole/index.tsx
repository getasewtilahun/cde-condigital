import {
  CloudDownloadOutlined,
  DeleteOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, Popover, Table, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../constants/Constants";
import { fetchAllUserRole } from "../../../redux/UserRole/UserRole.action";
import { ErrorHandler } from "../../../utilities/utilities";
import { OpenNotification } from "../../common/Notification/Notification.component";
import ReloadButtonComponent from "../../common/ReloadButton/ReloadButton.component";
import AddUserRoleComponent from "./components/Add/AddUserRole.component";
import ViewUserRoleComponent from "./components/View/ViewUserRole.component";
import { DELETE, UserRolePropType } from "./utils/UserRole.util";

const UserRoleComponent: FC<UserRolePropType> = ({
  fetchUserRoles,
  user_roles,
}) => {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchUserRoles({});
  }, [fetchUserRoles]);

  const onRemove = (id: number) => {
    setLoading(true);
    DELETE(id)
      .then(() => {
        fetchUserRoles();
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, "Role Removed", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Remove",
            e.message
          )
        );
      });
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <AddUserRoleComponent />
          <ReloadButtonComponent onClick={() => fetchUserRoles({})} />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-12">
          <Table
            loading={user_roles.isPending}
            dataSource={user_roles.payload.map((e, index) => ({
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
                dataIndex: "name",
              },

              {
                title: "Action",
                render: (value, record) => (
                  <Popover
                    placement="rightTop"
                    overlayClassName="action-popover"
                    trigger="focus"
                    content={
                      <div className="d-flex flex-column">
                        <ViewUserRoleComponent id={record.id} />
                        <AddUserRoleComponent id={record.id} />
                        <Popconfirm
                          title={`Are you sure to remove this`}
                          onConfirm={() => onRemove(record.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button
                            danger
                            icon={<DeleteOutlined />}
                            loading={loading}
                            type="text"
                          >
                            Remove
                          </Button>
                        </Popconfirm>
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
  user_roles: state.user_role.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUserRoles: (action: any) => dispatch(fetchAllUserRole(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserRoleComponent);
