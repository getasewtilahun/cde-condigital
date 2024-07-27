import { Button, Form, Input, Modal, Select } from "antd";
import { FC, useState, useEffect } from "react";
import { connect } from "react-redux";
import { EditOutlined } from "@ant-design/icons";

import { RuleObject } from "antd/lib/form";
import { validateEmail } from "../../../../Signup/BasicInfo/BasicInfo.util";
import {
  MODULES,
  NotificationType,
  ValidationStatus,
} from "../../../../../constants/Constants";
import { OpenNotification } from "../../../../common/Notification/Notification.component";
import {
  ErrorHandler,
  getUserData,
  searchProp,
} from "../../../../../utilities/utilities";
import { fetchAllUser } from "../../../../../redux/User/User.action";
import {
  fetchAllOrganization,
} from "../../../../../redux/Organization/Organization.action";
import {
  EditUserManagementPropType,
  PUT,
} from "../../utils/UserManagement.util";

const { Option } = Select;

const EditUserComponent: FC<EditUserManagementPropType> = ({
  data,
  fetchUsers,
  user_roles,
  fetchOrganizations,
  organizations,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const [email_status, setEmailValidation] = useState<any>("");
  const [organizationOptions, setOrganizationOptions] = useState<any[]>([]);

  const _data: any = { ...data };

  const is_super_user = getUserData().is_super_user;

  useEffect(() => {
    fetchOrganizations(); // Fetch organizations when component mounts
  }, [fetchOrganizations]);

  useEffect(() => {
    if (organizations.payload) {
      // Filter organizations to include only those with non-null categories
      const filteredOrganizations = organizations.payload.filter((org: any) => org.category);
      setOrganizationOptions(filteredOrganizations);
    }
  }, [organizations.payload]);

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
    let temp = {
      ...value,
      id: data.id,
    };

    PUT(temp)
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
      <Button type="text" onClick={() => setIsModalVisible(true)}>
        Edit
      </Button>
      <Modal
        className="fixed-modal"
        centered
        title="User"
        width={1200}
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
        <Form
          layout="vertical"
          onFinish={Submit}
          form={form}
          initialValues={{
            ..._data,
          }}
        >
          <div className="row">
            <div className="col-md-4">
              <Form.Item
                label="Full Name"
                name="full_name"
                rules={[{ required: true, message: "Full Name Required!" }]}
              >
                <Input placeholder="name" readOnly={!is_super_user} />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Email"
                name="email"
                hasFeedback
                validateStatus={email_status}
                rules={[
                  {
                    required: true,
                    // validator: EmailValidator,
                  },
                ]}
              >
                <Input
                  type="email"
                  placeholder="example@email.com"
                  readOnly={!is_super_user}
                />
              </Form.Item>
            </div>
            <div className="col-md-4">
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
                <Input
                  type="phone"
                  placeholder="+2519..."
                  readOnly={!is_super_user}
                />
              </Form.Item>
            </div>

            <div className="col-md-4">
              <Form.Item
                label="Organization"
                name="organization"
                rules={[{ required: true, message: "Please select Organization" }]}
              >
                <Select placeholder="Select Organization">
                  {organizationOptions.map((org: any) => (
                    <Option value={org.category} key={org.category}>
                      {org.category}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <div className="col-md-4">
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
  organizations: state.organization.fetchAll,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUsers: (action: any) => dispatch(fetchAllUser(action)),
  fetchOrganizations: () => dispatch(fetchAllOrganization({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUserComponent);
