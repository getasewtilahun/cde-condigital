import { FC, useEffect } from "react";
import { Form, Input, Button } from "antd";
import { connect } from "react-redux";
import { fetchOneUser } from "../../../../redux/User/User.action";
import { ErrorHandler, getUserData } from "../../../../utilities/utilities";
import { sendUserOnlyData, BasicInfoPropType } from "../../util/Setting.util";
import LoadingIndicator from "../../../common/Loading";
import { OpenNotification } from "../../../common/Notification/Notification.component";
import {
  NotificationType,
  telegram_bot_url,
} from "../../../../constants/Constants";

const BasicInfoComponent: FC<BasicInfoPropType> = ({
  fetchUser,
  user,
  form,
  loadingAction,
}) => {
  const [loading, setLoading] = loadingAction;

  useEffect(() => {
    fetchUser(getUserData().id);
  }, [fetchUser]);

  const submit = (value: any) => {
    setLoading(true);
    sendUserOnlyData({ ...value, id: getUserData().id })
      .then(() => {
        fetchUser(getUserData().id);
        setLoading(false);
        OpenNotification(NotificationType.SUCCESS, "User Updated", "");
      })
      .catch((error) => {
        setLoading(false);
        ErrorHandler(error).forEach((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "Failed to Update User",
            e.message
          )
        );
      });
  };

  return user.isPending ? (
    <LoadingIndicator />
  ) : (
    <Form
      layout="vertical"
      onFinish={submit}
      initialValues={{
        ...user.payload,
        phone_number: user.payload.phone_number || "+2519",
      }}
      form={form}
    >
      <div className="row">
        <div className="col-md-12">
          <Form.Item
            label="Name"
            rules={[{ message: "Please enter your full name", required: true }]}
            name="full_name"
          >
            <Input placeholder="name" />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item
            label="Email"
            rules={[
              { message: "Please enter new email address", required: true },
            ]}
            name="email"
          >
            <Input type="email" placeholder="Enter new email address" />
          </Form.Item>
        </div>
        <div className="col-md-12">
          <Form.Item
            label="Phone Number"
            rules={[
              {
                validator: (_, value) => {
                  return new Promise((resolve, reject) => {
                    let phone_number_regx = /^(^\+251)?9\d{8}$/;

                    if (!value) reject("Phone Number Required!");
                    else if (!value.match(phone_number_regx))
                      reject("Incorrect Phone Number Format!");
                    else resolve(null);
                  });
                },
              },
            ]}
            name="phone_number"
          >
            <Input placeholder="+251" />
          </Form.Item>
        </div>

        {`${user.payload.chat_id}`.startsWith("_") && (
          <>
            <div className="col-md-6">
              <Form.Item label="Telegram Verification Key">
                <Input
                  placeholder="telegram id"
                  value={user.payload?.chat_id.split("_")[1]}
                  readOnly
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `/verify_${user.payload?.chat_id.split("_")[1]}`
                    );
                    OpenNotification(
                      NotificationType.SUCCESS,
                      `Copied to clipboard`,
                      ""
                    );
                  }}
                />
              </Form.Item>
            </div>

            <div className="col-md-6 mt-3">
              <Button type="link" href={telegram_bot_url} target="_blank">
                Verify account to get Notification
              </Button>
            </div>
          </>
        )}
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

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfoComponent);
