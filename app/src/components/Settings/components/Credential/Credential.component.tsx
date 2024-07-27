import { Form, Input } from "antd";
import { FC } from "react";
import { connect } from "react-redux";
import { NotificationType } from "../../../../constants/Constants";
import { fetchOneUser } from "../../../../redux/User/User.action";
import { ErrorHandler, getUserData } from "../../../../utilities/utilities";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import { CredentialPropType, sendPasswordData } from "../../util/Setting.util";

const CredentialComponent: FC<CredentialPropType> = ({
  fetchUser,
  user,
  form,
  loadingAction,
}) => {
  const [loading, setLoading] = loadingAction;

  const submit = (value: any) => {
    setLoading(true);
    delete value["confirmPassword"];

    sendPasswordData(value)
      .then(() => {
        fetchUser(getUserData().id);

        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, "Password Updated", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Update User",
            e.message
          )
        );
      });
  };

  return (
    <Form layout="vertical" form={form} onFinish={submit}>
      <div className="row">
        <div className="col-md-12">
          <Form.Item
            label="Old Password"
            name="old_password"
            rules={[{ required: true, message: "Old Password Required" }]}
          >
            <Input type={"password"} placeholder="password" />
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Form.Item
            label="New Password"
            name="new_password"
            rules={[{ required: true, message: "Password Required" }]}
          >
            <Input type={"password"} placeholder="password" />
          </Form.Item>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <Form.Item
            label="Confirm password"
            name="confirmPassword"
            dependencies={["new_password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("new_password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The two passwords do not match!")
                  );
                },
              }),
            ]}
          >
            <Input type={"password"} placeholder="password" />
          </Form.Item>
        </div>
      </div>
    </Form>
  );
};

/**
 * Map State to Props
 *
 * @param state
 */
const mapStateToProps = (state: any) => ({
  user: state.user.fetchOne,
});

/**
 * Map Dispatch to Props
 *
 * @param dispatch
 */
const mapDispatchToProps = (dispatch: any) => ({
  fetchUser: (action: any) => dispatch(fetchOneUser(action)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CredentialComponent);
