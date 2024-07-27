import Checkbox from "antd/lib/checkbox";
import Form, { FormInstance, RuleObject } from "antd/lib/form";
import Input from "antd/lib/input";
import Col from "antd/lib/col";
import Row from "antd/lib/row";
import Password from "antd/lib/input/Password";
import { FC, useState } from "react";
import { validateEmail } from "./BasicInfo.util";
import { ValidationStatus } from "../../../constants/Constants";
import TermComponent from "../../Login/components/Terms/Tems.component";
// import { PhoneValidator } from "../../../utilities/utilities";
const BasicInfoComponent: FC<{
  form: FormInstance;
  data: any;
  setData: Function;
  next: Function;
}> = ({ form, data, next, setData }) => {
  const [email_status, setEmailValidation]: any = useState();

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

  const onFinish = (value: any) => {
    setData({ ...data, ...value });
    next();
  };

  return (
    <Form
      layout={"vertical"}
      form={form}
      initialValues={data}
      onFinish={onFinish}
    >
      <Row>
        <Col xs={24} sm={24} md={24}>
          <Form.Item
            label="Full Name"
            name="full_name"
            rules={[{ required: true, message: "Full Name Required!" }]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
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

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Password Required!" }]}
      >
        <Password />
      </Form.Item>
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
        <Password />
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
      >
        <Checkbox className="float-left">
          By creating an account, you agree to our
          <TermComponent />
        </Checkbox>
      </Form.Item>
    </Form>
  );
};
export default BasicInfoComponent;
