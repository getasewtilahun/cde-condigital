import { AutoComplete, Button, Form, Input, Modal, Select, Table } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { EditOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import {
  EditAssignmentPropType,
  Roles,
  sendData,
} from "../../util/ProjectAssignment.util";
import {
  fetchAllUserAssignment,
  fetchOneUserAssignment,
} from "../../../../../redux/UserAssignment/UserAssignment.action";
import { User } from "../../../../../redux/User/User.type";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";
import { isEmpty, isNil } from "lodash";

const EditAssignmentComponent: FC<EditAssignmentPropType> = ({
  users,
  project,
  fetchAllAssignedUser,
  fetchOneAssignedUser,
  assigned_user,
  id,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<{ value: string }[]>([]);
  const [accessData, setAccessData] = useState<any>([]);
  const [form] = Form.useForm();
  const [selected, setSelected] = useState<User | undefined>();
  const { TextArea } = Input;

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
    setAccessData([]);
    setLoading(false);
  };

  const onSearch = (searchText: string) => {
    const arr = [...Roles];
    setOptions(!searchText ? [] : arr);
  };

  useEffect(() => {
    if (isModalVisible) fetchOneAssignedUser(id);
  }, [fetchOneAssignedUser, id, isModalVisible]);

  useEffect(() => {
    if (!isEmpty(assigned_user.payload)) {
      form.setFieldsValue({
        role: assigned_user.payload.role,
        user_id: assigned_user.payload.user_id,
      });
      let arr = assigned_user.payload?.user_assignment_items?.map(
        (e: any, i: number) => ({
          key: i + Date.now(),
          ...e,
        })
      );
      setAccessData(arr);
      setSelected(users.payload.find((user) => user.id === assigned_user.payload.user_id))
    }
  }, [assigned_user, isModalVisible]);

  const onChangeHandler = (key: number, name: string, value: any) => {
    const newData = [...accessData];
    const index = newData.findIndex((e) => e.key === key);
    if (index !== -1) {
      let item = newData[index];
      item = {
        ...item,
        [name]: value,
      };
      newData.splice(index, 1, item);
      setAccessData(newData);
    }
  };

  const removeHandler = (key: number) => {
    if (accessData.length > 2) {
      setAccessData(accessData.filter((item: any) => item.key !== key));
    }
  };

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      user_id: value.user_id,
      role: value.role,
      project_id: project.payload.id,
      user_assignment_items: accessData.map((item: any) => ({
        ...item,
      })),
    };

    sendData(data)
      .then(() => {
        form.resetFields();
        setSelected(undefined);
        handleOk();
        fetchAllAssignedUser({ project_id: project.payload.id });
        setLoading(false);
        OpenNotification(
          NotificationType.SUCCESS,
          Message.PROJECT_ASSIGNED_SUCCESS,
          ""
        );
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            Message.PROJECT_ASSIGNED_FAILED,
            e.message
          )
        );
      });
  };

  return (
    <>
      <Button
        type="text"
        icon={<EditOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Edit
      </Button>
      <Modal
        className="fixed-modal"
        style={{ top: 35 }}
        width={1300}
        title="Edit User Assignment"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[
          <>
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
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{
            role: assigned_user.payload.role,
            user_id: assigned_user.payload.user_id,
          }}
        >
          <div className="row">
            <div className="col-md-4">
              <Form.Item
                label="Name"
                name="user_id"
                rules={[{ message: "User is Required!", required: true }]}
              >
                <Select
                  placeholder="Select User"
                  onChange={(e) =>
                    setSelected(users.payload.find((user) => user.id === e))
                  }
                >
                  {users.payload.map((e, index) => (
                    <Select.Option key={index} value={e.id}>
                      {e.full_name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Email">
                <Input value={selected?.email} />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item name="role" label="Role">
                <AutoComplete
                  options={options}
                  onSearch={onSearch}
                  filterOption={(inputValue: any, option: any) =>
                    option!.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Table
                className="dailyreport-bordered"
                columns={[
                  {
                    title: "No",
                    dataIndex: "no",
                    width: "2%",
                    render: (data, record) =>
                      record.is_category ? <span>{record.no}</span> : "",
                  },
                  {
                    title: "Category",
                    dataIndex: "category",
                    width: "5%",
                    render: (data, record) =>
                      record.is_category ? <span>{record.category}</span> : "",
                  },
                  {
                    title: "Folders",
                    dataIndex: "folder",
                    width: "5%",
                    render: (data, record) =>
                      record.is_folder ? <span>{record.folder}</span> : "",
                  },
                  {
                    title: "Sub Folders",
                    dataIndex: "sub_folder",
                    width: "5%",
                    render: (data, record) =>
                      record.is_sub_folder ? (
                        <span>{record.sub_folder}</span>
                      ) : (
                        ""
                      ),
                  },
                  {
                    title: "Description",
                    width: "5%",
                    dataIndex: "description",
                    render: (value, record) =>
                      !record.is_category &&
                      !record.is_folder &&
                      !record.is_sub_folder ? (
                        <TextArea
                          autoSize
                          rows={2}
                          bordered={false}
                          value={record.description}
                          onChange={(e) =>
                            onChangeHandler(
                              record.key,
                              "description",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        ""
                      ),
                  },
                  {
                    title: "Format",
                    width: "5%",
                    dataIndex: "format",
                    render: (value, record) =>
                      !record.is_category &&
                      !record.is_folder &&
                      !record.is_sub_folder ? (
                        <Input
                          bordered={false}
                          value={record.format}
                          onChange={(e) =>
                            onChangeHandler(
                              record.key,
                              "format",
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        ""
                      ),
                  },
                  {
                    title: "Privilege",
                    dataIndex: "privilege",
                    width: "5%",
                    key: "privilege",
                    render: (value, record) =>
                      !record.is_category &&
                      !record.is_folder &&
                      !record.is_sub_folder ? (
                        <Select
                          style={{ width: "100%" }}
                          value={record.privilege}
                          onChange={(e) =>
                            onChangeHandler(record.key, "privilege", e)
                          }
                        >
                          <Select.Option value={"Write"}>
                            {"Write"}
                          </Select.Option>
                          <Select.Option value={"Read"}>{"Read"}</Select.Option>
                          <Select.Option value={"Review and Approve"}>
                            {"Review and Approve"}
                          </Select.Option>
                          <Select.Option value={"Authorized"}>
                            {"Authorized"}
                          </Select.Option>
                          <Select.Option value={"No Access"}>
                            {"No Access"}
                          </Select.Option>
                        </Select>
                      ) : (
                        ""
                      ),
                  },
                  {
                    title: "Action",
                    width: "2%",
                    render: (data, record, index) =>
                      !record.is_category &&
                      !record.is_folder &&
                      !record.is_sub_folder ? (
                        <div className="d-flex">
                          <Button
                            className="btn-outline-secondary"
                            onClick={() => removeHandler(record.key)}
                            disabled={!isNil(record.id)}
                          >
                            <MinusOutlined />
                          </Button>
                          <Button
                            className=" btn-outline-secondary"
                            onClick={() => {
                              const newData = [...accessData];
                              newData.splice(index + 1, 0, {
                                key: accessData.length + 1,
                                is_category: false,
                                is_folder: false,
                                is_sub_folder: false,
                                category: record.category,
                                folder: record.folder,
                                sub_folder: record.sub_folder,
                                description: "",
                                format: "",
                                privilege: "No Access",
                              });
                              setAccessData(newData);
                            }}
                          >
                            <PlusOutlined />
                          </Button>
                        </div>
                      ) : (
                        ""
                      ),
                  },
                ]}
                dataSource={accessData}
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
  project: state.project.fetchOne,
  users: state.user.fetchAll,
  assigned_user: state.user_assignment.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAllAssignedUser: (action: any) =>
    dispatch(fetchAllUserAssignment(action)),
  fetchOneAssignedUser: (action: any) =>
    dispatch(fetchOneUserAssignment(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAssignmentComponent);
