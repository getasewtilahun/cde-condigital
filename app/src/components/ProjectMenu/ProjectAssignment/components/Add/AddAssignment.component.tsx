import { AutoComplete, Button, Form, Input, Modal, Select } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";
import { AddAssignmentPropType, sendData, fetchRolesFromBackend } from "../../util/ProjectAssignment.util"; // Adjust the import path
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { Message, NotificationType } from "../../../../../constants/Constants";
import { ErrorHandler } from "../../../../../utilities/utilities";
import { User } from "../../../../../redux/User/User.type";
import { fetchAllUserAssignment } from "../../../../../redux/UserAssignment/UserAssignment.action";
import { UserRole } from "../../../../../redux/UserRole/UserRole.type";
import { useHistory } from "react-router";

const AddAssignmentComponent: FC<AddAssignmentPropType> = ({
  users,
  project,
  fetchAssignedUser,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
  const { TextArea } = Input;
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const roles = await fetchRolesFromBackend();
        if (Array.isArray(roles)) {
          setUserRoles(roles);
        } else {
          console.error("Roles fetched are not in the expected format");
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  const handleOk = () => {
    setIsModalVisible(false);
    setLoading(false);
  };

  const onSelectUser = (userId: number) => {
    setSelectedUserId(userId);
  };

  console.log("project", project)

  const Submit = (value: any) => {
    setLoading(true);
    console.log(value.assigned_id);
    console.log(project);
    const data: any = [];
    value.assigned_id?.map((item: any) => {
      data.push({
        assigned_id: parseInt(item),
        project_id: project.id,
      })
    })
    console.log("data", data)
    sendData(data)
      .then(() => {
        handleOk();
        fetchAssignedUser({ project_id: project.id });
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
        className="btn-outline-secondary"
        style={{ float: "right" }}
        icon={<PlusOutlined />}
        onClick={() => setIsModalVisible(true)}
      >
        Assign
      </Button>
      <Modal
        className="fixed-modal"
        width={500}
        style={{ top: 35 }}
        title="User Assignment"
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
        <Form layout="vertical" onFinish={Submit} form={form}>
          <div className="row">
            <div className="col-md-12">
              <Form.Item
                label="Name"
                name="assigned_id"
                rules={[{ message: "User is Required!", required: true }]}
              >
                <Select
                  showSearch
                  mode="multiple"
                  placeholder="Select User"
                  optionFilterProp="children"
                  onChange={(userId: number) => onSelectUser(userId)}
                  filterOption={(input: string, option: { children: string; }) =>
                    option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {users.payload.map(
                    (user) => (
                      <Select.Option key={user.id} value={user.id}>
                        {user.full_name} - {user.email}
                      </Select.Option>
                    )
                  )}

                </Select>
              </Form.Item>
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
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchAssignedUser: (action: any) => dispatch(fetchAllUserAssignment(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAssignmentComponent);
