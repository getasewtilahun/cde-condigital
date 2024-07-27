import { CheckOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Table, Tag } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchAllUserRole,
  fetchOneUserRole,
} from "../../../../../redux/UserRole/UserRole.action";
import { ViewUserRolePropType } from "../../utils/UserRole.util";
const ViewUserRoleComponent: FC<ViewUserRolePropType> = ({
  fetchUserRole,
  id,
  user_role,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (isModalVisible && id) fetchUserRole(id);
  }, [isModalVisible, id]);

  return (
    <>
      <Button
        type="text"
        icon={<EyeOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        View
      </Button>
      <Modal
        className="fixed-modal"
        centered
        title="User Role"
        width={1300}
        open={isModalVisible}
        onCancel={handleOk}
        footer={[<></>]}
      >
        <Form layout="vertical">
          <div className="row">
            <div className="col-md-4">
              <Form.Item label="Role Name">
                <Input placeholder="name" value={user_role.payload?.name} />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Table
                loading={user_role.isPending}
                columns={[
                  {
                    title: "Feature",
                    key: "feature",
                    width: "50%",
                    dataIndex: "feature",
                  },
                  {
                    title: "Read Only",
                    key: "read",
                    dataIndex: "read",
                    render: (value, record) =>
                      record.read ? (
                        <span>
                          <CheckOutlined style={{ color: "#047857" }} />
                        </span>
                      ) : (
                        "-"
                      ),
                  },
                  {
                    title: "Write",
                    key: "write",
                    dataIndex: "write",
                    render: (value, record) =>
                      record.write ? (
                        <span>
                          <CheckOutlined style={{ color: "#047857" }} />
                        </span>
                      ) : (
                        "-"
                      ),
                  },
                  {
                    title: "Edit",
                    key: "edit",
                    dataIndex: "edit",
                    render: (value, record) =>
                      record.edit ? (
                        <span>
                          <CheckOutlined style={{ color: "#047857" }} />
                        </span>
                      ) : (
                        "-"
                      ),
                  },
                  {
                    title: "Delete",
                    key: "delete",
                    dataIndex: "delete",
                    render: (value, record) =>
                      record.delete ? (
                        <span>
                          <CheckOutlined style={{ color: "#047857" }} />
                        </span>
                      ) : (
                        "-"
                      ),
                  },
                  {
                    title: "Approve",
                    key: "approve",
                    dataIndex: "approve",
                    render: (value, record) =>
                      record.approve ? (
                        <span>
                          <CheckOutlined style={{ color: "#047857" }} />
                        </span>
                      ) : (
                        "-"
                      ),
                  },
                  {
                    title: "Check",
                    key: "check",
                    dataIndex: "check",
                    render: (value, record) =>
                      record.check ? (
                        <span>
                          <CheckOutlined style={{ color: "#047857" }} />
                        </span>
                      ) : (
                        "-"
                      ),
                  },
                ]}
                dataSource={user_role.payload?.user_accesses}
                pagination={false}
              />
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  user_role: state.user_role.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUserRoles: (action: any) => dispatch(fetchAllUserRole(action)),
  fetchUserRole: (action: any) => dispatch(fetchOneUserRole(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewUserRoleComponent);
