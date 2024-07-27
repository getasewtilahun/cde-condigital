import {
  Button,
  Form,
  Modal,
  Popconfirm,
  Radio,
  Select,
  Table,
  Tag,
} from "antd";
import { FC, useEffect, useState } from "react";
import { connect } from "react-redux";
import { ShareAltOutlined } from "@ant-design/icons";
import { getUsers, SharePropType } from "./Share.util";
import { getUserData, searchProp } from "../../../utilities/utilities";
import { toNumber } from "lodash";
import { Status } from "../../../constants/Constants";
import { fetchFeatureUser } from "../../../redux/User/User.action";
const ShareComponent: FC<SharePropType> = ({
  loading,
  onShare,
  payload,
  users,
  onRemove,
  fetchUsers,
  feature,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selected_user, setSelectedUser] = useState<
    undefined | (typeof users.payload)[0]
  >(undefined);
  useEffect(() => {
    if (isModalVisible) fetchUsers({ feature });
  }, [isModalVisible, feature]);

  const [form] = Form.useForm();

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const getStatus = (status: number, type: string) => {
    if (type !== "View")
      switch (status) {
        case Status.PENDING:
          return <Tag color="yellow">Pending</Tag>;
        case Status.REVISE:
          return <Tag color="yellow">Revise</Tag>;
        case Status.APPROVED:
          return type === "Check" ? (
            <Tag color="green">Checked</Tag>
          ) : (
            <Tag color="green">Approved</Tag>
          );
        default:
          return <div></div>;
      }
  };

  return (
    <>
      <Button
        className="pl-0"
        type="text"
        icon={<ShareAltOutlined />}
        onClick={() => setIsModalVisible(true)}
      ></Button>
      <Modal
        className="fixed-modal"
        centered
        title="Share"
        width={800}
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
              Share
            </Button>
          </>,
        ]}
      >
        <Form
          layout="vertical"
          onFinish={(values) => onShare(values)}
          form={form}
          initialValues={{ type: "View" }}
        >
          <div className="row">
            <div className="col-md-6">
              <Form.Item
                label="User"
                name="user_id"
                rules={[{ required: true, message: "User is Required" }]}
              >
                <Select
                  placeholder="name"
                  {...searchProp}
                  onChange={(e) => {
                    setSelectedUser(
                      users.payload.find((user) => user.id === e)
                    );
                    form.setFieldsValue({ type: "View" });
                  }}
                >
                  {getUsers(users.payload, payload, feature).map(
                    (user, index) => (
                      <Select.Option value={user.id} key={index}>
                        {user.full_name}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Form.Item>
            </div>
            <div className="col-md-6">
              <Form.Item label="Action" name="type">
                <Radio.Group>
                  <Radio value="View"> View </Radio>
                  <Radio disabled={!selected_user?.approve} value="Check">
                    {" "}
                    Check{" "}
                  </Radio>
                  <Radio disabled={!selected_user?.approve} value="Approve">
                    {" "}
                    Approve{" "}
                  </Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12">
              <Table
                dataSource={payload}
                pagination={false}
                columns={[
                  {
                    title: "No",
                    key: "no",
                    render: (value, record, index) => index + 1,
                  },
                  {
                    title: "Name",
                    key: "user",
                    render: (value, record) =>
                      users.payload.find((e) => e.id === record.user_id)
                        ?.full_name,
                  },

                  {
                    title: "Type",
                    key: "type",
                    render: (value, record) => record.type,
                  },
                  {
                    title: "Status",
                    key: "status",

                    render: (value, record) =>
                      getStatus(record.status, record.type),
                  },
                  {
                    title: "Assigned By",
                    key: "assigned_by",
                    render: (value, record) =>
                      users.payload.find((e) => e.id === record.assigned_by)
                        ?.full_name,
                  },
                  {
                    title: "Action",
                    key: "action",
                    render: (value, record) =>
                      record.assigned_by === toNumber(getUserData().id) ||
                      getUserData().is_super_user ? (
                        <Popconfirm
                          placement="leftTop"
                          title="Are you sure you want to remove this Assigned User?"
                          onConfirm={() => onRemove(record.id)}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button danger type="text">
                            Delete
                          </Button>
                        </Popconfirm>
                      ) : null,
                  },
                ]}
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
  users: state.user.fetchFeature,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: (action: any) => dispatch(fetchFeatureUser(action)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ShareComponent);
