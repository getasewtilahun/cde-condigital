import Select from "antd/lib/select";
import Form, { FormInstance } from "antd/lib/form";
import Input from "antd/lib/input";
import { FC } from "react";
import { MODULES } from "../../../constants/Constants";
import { NotificationType } from "../../../constants/Constants";
import { register } from "./AdditionalInfo.util";
import { OpenNotification } from "../../common/Notification/Notification.component";
import { useHistory } from "react-router";
import { RouteConstants } from "../../../router/Constants";
import { ErrorHandler } from "../../../utilities/utilities";

const { Option } = Select;

const AdditionalInfoComponent: FC<{
  form: FormInstance;
  data: any;
  setData: Function;
  next: Function;
  setLoading: Function;
}> = ({ data, next, form, setData, setLoading }) => {
  const history = useHistory();

  const onFinish = (value: any) => {
    const user_data = {
      ...data,
      ...value,
      modules_subscribed: JSON.stringify(value.modules_subscribed),
      role: value.role,
      position: value.role,
    };

    setData({
      ...data,
      ...value,
      role: user_data.role,
    });
    
    register(user_data)
      .then(() => {
        history.push(RouteConstants.LOGIN);
        OpenNotification(NotificationType.SUCCESS, "User Registered", "");
      })
      .catch((error) => {
        console.log(
          "🚀 ~ file: AdditionalInfo.component.tsx:63 ~ onFinish ~ error",
          error
        );
        setLoading(false);
        ErrorHandler(error).map((e: any) =>
          OpenNotification(
            NotificationType.ERROR,
            "User Registration Failed",
            e.message
          )
        );
      });
  };

  return (
    <Form
      form={form}
      layout={"vertical"}
      onFinish={onFinish}
      initialValues={data}
    >
      <Form.Item
        label="Role (Position)"
        name="role"
        rules={[{ required: true, message: "Role Required!" }]}
      >
        <Input placeholder="CEO" />
      </Form.Item>

      <Form.Item
        label="Module Access"
        name="modules_subscribed"
        rules={[{ required: true, message: "Please select modules" }]}
      >
        <Select mode="multiple" placeholder="Modules" showSearch={false}>
          <Option key={3} value={MODULES.PROCUREMENT}>
            {MODULES.PROCUREMENT}
          </Option>

          <Option key={4} value={MODULES.INVENTORY}>
            {MODULES.INVENTORY}
          </Option>
        </Select>
      </Form.Item>
    </Form>
  );
};
export default AdditionalInfoComponent;
