import { Button, Checkbox, Form, Input, Modal, Table } from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  fetchAllUserRole,
  fetchOneUserRole,
} from "../../../../../redux/UserRole/UserRole.action";
import { AddUserRolePropType, getRoles, POST } from "../../utils/UserRole.util";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { NotificationType } from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";
import { UserAccess } from "../../../../../redux/UserRole/UserRole.type";
const AddUserRoleComponent: FC<AddUserRolePropType> = ({
  fetchUserRoles,
  fetchUserRole,
  user_role,
  id,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState<UserAccess[]>([]);

  useEffect(() => {
    if (id) {
      setData(getRoles(user_role.payload?.user_accesses));
    } else {
      setData(getRoles([]));
    }
  }, [id, user_role]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const Submit = (value: any) => {
    setLoading(true);
    const parsed = {
      ...value,
      id,
      user_accesses: data,
    };

    POST(parsed)
      .then(() => {
        fetchUserRoles();
        handleOk();
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, "User Role Registered", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Register User Role",
            e.message
          )
        );
      });
  };

  useEffect(() => {
    if (isModalVisible) {
    }
    if (isModalVisible && id) fetchUserRole(id);
  }, [isModalVisible, id]);

  useEffect(() => {
    if (id && user_role.payload) form.setFieldsValue({ ...user_role.payload });
  }, [form, id, user_role]);

  const onChangeHandler = (key: number, name: string, value: boolean) => {
    const new_data = [...data];
    const index = data.findIndex((e) => e.key === key);
    if (index !== -1) {
      let selected = { ...new_data[index], [name]: value };
      if (name === "full_access")
        selected = {
          ...selected,
          read: value,
          delete: value,
          edit: value,
          write: value,
          approve: value,
          check: value,
        };

      new_data.splice(index, 1, selected);

      setData(new_data);
    }
  };

  const onMultipleSelect = (key: number, name: string, value: any) => {
    const index = data.findIndex((e) => e.key === key);
    if (index !== -1) {
      const new_data = [...data];

      let item: any = { ...new_data[index] };
      const list: any[] = item[name] ?? [];

      item = { ...item, [name]: [...list, value] };

      new_data.splice(index, 1, item);

      setData(new_data);
    }
  };

  const onMultipleDeselect = (key: number, name: string, value: number) => {
    const index = data.findIndex((e) => e.key === key);
    if (index !== -1) {
      const new_data = [...data];

      let item: any = { ...new_data[index] };
      const list: any[] = item[name] ?? [];

      item = { ...item, [name]: list.filter((e) => e !== value) };

      new_data.splice(index, 1, item);

      setData(new_data);
    }
  };

  return (
    <>
      {id ? (
        <Button
          type="text"
          icon={<EditOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Edit
        </Button>
      ) : (
        <Button
          className="btn-outline-secondary"
          style={{ float: "right" }}
          icon={<PlusOutlined />}
          onClick={() => setIsModalVisible(true)}
        >
          Register
        </Button>
      )}
      <Modal
        className="fixed-modal"
        centered
        title="User Role"
        width={1300}
        open={isModalVisible}
        onCancel={handleOk}
        footer={[
          <>
            <Button className="btn-outline" htmlType="reset" onClick={handleOk}>
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={() => form.submit()}
            >
              Save Changes
            </Button>
          </>,
        ]}
      >
        <Form layout="vertical" onFinish={Submit} form={form}>
          <div className="row">
            <div className="col-md-4">
              <Form.Item
                name="name"
                label="Role Name"
                rules={[{ required: true, message: "Role Name is Required" }]}
              >
                <Input placeholder="name" />
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
                    width: "30%",
                    dataIndex: "feature",
                  },
                  {
                    title: "Read Only",
                    key: "read",
                    dataIndex: "read",
                    render: (value, record) => (
                      <Checkbox
                        disabled={
                          record.delete ||
                          record.edit ||
                          record.write ||
                          record.approve ||
                          record.check
                        }
                        checked={
                          record.read ||
                          record.delete ||
                          record.edit ||
                          record.write ||
                          record.approve ||
                          record.check
                        }
                        onChange={(e) =>
                          onChangeHandler(record.key, "read", e.target.checked)
                        }
                      />
                    ),
                  },
                  {
                    title: "Write",
                    key: "write",
                    dataIndex: "write",
                    render: (value, record) => (
                      <Checkbox
                        checked={record.write}
                        onChange={(e) =>
                          onChangeHandler(record.key, "write", e.target.checked)
                        }
                      />
                    ),
                  },
                  {
                    title: "Edit",
                    key: "edit",
                    dataIndex: "edit",
                    render: (value, record) => (
                      <Checkbox
                        checked={record.edit}
                        onChange={(e) =>
                          onChangeHandler(record.key, "edit", e.target.checked)
                        }
                      />
                    ),
                  },
                  {
                    title: "Delete",
                    key: "delete",
                    dataIndex: "delete",
                    render: (value, record) => (
                      <Checkbox
                        checked={record.delete}
                        onChange={(e) =>
                          onChangeHandler(
                            record.key,
                            "delete",
                            e.target.checked
                          )
                        }
                      />
                    ),
                  },
                  {
                    title: "Approve",
                    key: "approve",
                    dataIndex: "approve",
                    render: (value, record) => (
                      <Checkbox
                        checked={record.approve}
                        onChange={(e) =>
                          onChangeHandler(
                            record.key,
                            "approve",
                            e.target.checked
                          )
                        }
                      />
                    ),
                  },
                  {
                    title: "Check",
                    key: "check",
                    dataIndex: "check",
                    render: (value, record) => (
                      <Checkbox
                        checked={record.check}
                        onChange={(e) =>
                          onChangeHandler(record.key, "check", e.target.checked)
                        }
                      />
                    ),
                  },
                  {
                    title: "Full Access",
                    key: "full_access",
                    dataIndex: "full_access",
                    render: (value, record) => (
                      <Checkbox
                        checked={
                          record.read &&
                          record.delete &&
                          record.edit &&
                          record.write &&
                          record.approve
                        }
                        onChange={(e) =>
                          onChangeHandler(
                            record.key,
                            "full_access",
                            e.target.checked
                          )
                        }
                      />
                    ),
                  },
                ]}
                dataSource={data}
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
)(AddUserRoleComponent);
