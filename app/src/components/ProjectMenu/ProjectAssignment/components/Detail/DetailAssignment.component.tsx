import { Button, Form, Input, Modal, Table } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { EyeOutlined } from "@ant-design/icons";
import { DetailAssignmentPropType } from "../../util/ProjectAssignment.util";
import { fetchOneUserAssignment } from "../../../../../redux/UserAssignment/UserAssignment.action";
import { isEmpty } from "lodash";

const DetailAssignmentComponent: FC<DetailAssignmentPropType> = ({
  users,
  fetchOneAssignedUser,
  assigned_user,
  id,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [accessData, setAccessData] = useState<any>([]);
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const handleOk = () => {
    setIsModalVisible(false);
    form.resetFields();
    setAccessData([]);
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
    }
  }, [assigned_user, isModalVisible]);

  return (
    <>
      <Button
        type="link"
        icon={<EyeOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Detail
      </Button>
      <Modal
        width={1300}
        style={{ top: 35 }}
        className="fixed-modal"
        title="User Assignment Detail"
        visible={isModalVisible}
        onCancel={handleOk}
        footer={[]}
      >
        <Form layout="vertical" form={form}>
          <div className="row">
            <div className="col-md-4">
              <Form.Item
                label="Name"
                rules={[{ message: "User is Required!", required: true }]}
              >
                <Input
                  value={
                    users.payload.find(
                      (user) => user.id === assigned_user.payload.user_id
                    )?.full_name
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item label="Email">
                <Input
                  value={
                    users.payload.find(
                      (user) => user.id === assigned_user.payload.user_id
                    )?.email
                  }
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
              <Form.Item  label="Role">
                <Input value={assigned_user.payload.role} />
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
                          readOnly
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
                          readOnly
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
                        <Input
                          bordered={false}
                          value={record.privilege}
                          readOnly
                        />
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
  users: state.user.fetchAll,
  assigned_user: state.user_assignment.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchOneAssignedUser: (action: any) =>
    dispatch(fetchOneUserAssignment(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailAssignmentComponent);
