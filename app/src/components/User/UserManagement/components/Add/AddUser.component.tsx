import { Button, Form, Input, Modal, Select } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { PlusOutlined } from "@ant-design/icons";

import { RuleObject } from "antd/lib/form";
import { validateEmail } from "../../../../Signup/BasicInfo/BasicInfo.util";
import {
  NotificationType,
  ValidationStatus,
} from "../../../../../constants/Constants";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import { ErrorHandler, searchProp } from "../../../../../utilities/utilities";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import { fetchAllOrganization } from "../../../../../redux/Organization/Organization.action"; // Add this import
import {
  AddUserManagementPropType,
  POST,
} from "../../utils/UserManagement.util";

const { Option } = Select;

const AddUserComponent: FC<AddUserManagementPropType> = ({
  fetchUsers,
  fetchOrganizations, // Add this prop
  user_roles,
  organizations, // Add this prop
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [email_status, setEmailValidation] = useState<any>("");

  // Fetch organizations on component mount
  useEffect(() => {
    fetchOrganizations(); // Fetch organizations
  }, [fetchOrganizations]);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const EmailValidator = (rule: RuleObject, value: any) => {
    return new Promise((resolve, reject) => {
      setEmailValidation(ValidationStatus.VALIDATING);
      if (value) {
        if (
          /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            value
          )
        ) {
          validateEmail(value)
            .then(() => {
              setEmailValidation("");
              resolve(true);
            })
            .catch((error) => {
              setEmailValidation(ValidationStatus.ERROR);
              reject("Email Already Exist");
            });
        } else {
          setEmailValidation(ValidationStatus.ERROR);
          reject("Input Correct Email");
        }
      } else {
        setEmailValidation(ValidationStatus.ERROR);
        reject("Email Required!");
      }
    });
  };

  const Submit = (value: any) => {
    setLoading(true);
    const data = {
      ...value,
    };

    POST(data)
      .then(() => {
        fetchUsers({ filter: "all" });
        handleOk();
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, "User Registered", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Register User",
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
        Register
      </Button>
      <Modal
        className="fixed-modal"
        centered
        title="User"
        width={600}
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
            <div className="col-md-12">
              <Form.Item
                label="Full Name"
                name="full_name"
                rules={[{ required: true, message: "Full Name Required!" }]}
              >
                <Input placeholder="name" />
              </Form.Item>
            </div>

            <div className="col-md-12">
              <Form.Item
                label="Email"
                name="email"
                hasFeedback
                validateStatus={email_status}
                rules={[
                  {
                    required: true,
                    validator: EmailValidator,
                  },
                ]}
              >
                <Input type="email" placeholder="example@email.com" />
              </Form.Item>
            </div>
            <div className="col-md-12">
              <Form.Item
                label="Phone"
                name="phone"
                hasFeedback
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="phone" placeholder="+2519..." />
              </Form.Item>
            </div>

            <div className="col-md-12">
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Password Required!" }]}
              >
                <Input.Password placeholder="password" />
              </Form.Item>
            </div>

            <div className="col-md-12">
              <Form.Item
                label="Confirm password"
                name="confirmPassword"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("The two passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="confirm password" />
              </Form.Item>
            </div>

            <div className="col-md-12">
              <Form.Item
                label="Organization"
                name="organization"
                rules={[{ required: true, message: "Please select an Organization" }]}
              >
                <Select placeholder="Select Organization">
                  {organizations.payload
                    .filter((org: any) => org.category) // Filter out entries where category is null or undefined
                    .map((org: any) => (
                      <Option value={org.category} key={org.category}>
                        {org.category}
                      </Option>
                    ))}
                </Select>
              </Form.Item>

            </div>

            <div className="col-md-12">
              <Form.Item
                label="Role"
                name="role_id"
                rules={[{ required: true, message: "Please select Role" }]}
              >
                <Select {...searchProp} placeholder="Role">
                  {user_roles.payload.map((e, index) => (
                    <Option value={e.id} key={index}>
                      {e.name}
                    </Option>
                  ))}
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
  user_roles: state.user_role.fetchAll,
  organizations: state.organization.fetchAll, // Add organizations state
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
  fetchOrganizations: () => dispatch(fetchAllOrganization()), // Add fetchOrganizations
});

export default connect(mapStateToProps, mapDispatchToProps)(AddUserComponent);
