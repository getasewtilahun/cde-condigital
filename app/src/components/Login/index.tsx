import { useState } from "react";
import Logo from "../../Images/LogoHorizontal.svg";
import { getRoute, login } from "./util/Login.util";
import {
  getUserData,
  initAxios,
  logout,
  saveUserData,
} from "../../utilities/utilities";
import { Link, useHistory } from "react-router-dom";

import AboutComponent from "./components/About/About.component";
import TermComponent from "./components/Terms/Tems.component";
import Password from "antd/lib/input/Password";
import { Alert, Button, Card, Form, Input, Row } from "antd";

const LoginComponent = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onFinish = (values: any) => {
    setError("");
    setLoading(true);
    login(values)
      .then((res) => {
        console.log("response", res);
        initAxios(res.data.token);
        saveUserData(res.data);
        setLoading(false);
        history.push(getRoute(res.data));
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        if (error.response && error.response.data.message) {
          setError(error.response.data.message);
        }
        if (error.response?.status) {
          setError("Invalid username or password");
        } else {
          console.log(error.response);
          setError("Oops, seems server is down, try again in a moment!");
        }
      });
  };

  return (
    <div className="login-wrapper">
      <div>
        <div className="mb-2 mx-auto">
          {error && <Alert message={error} type="error" closable />}
        </div>
        <Card
          style={{ width: "400px", height: "auto" }}
          actions={[<AboutComponent />, <TermComponent />]}
        >
          <img
            src={Logo}
            alt="logo"
            className="LoginLogo mx-auto d-block pb-4"
          />
          <Form name="basic" layout={"vertical"} onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password",
                },
              ]}
            >
              <Password />
            </Form.Item>
            <Button
              htmlType="submit"
              className="mt-4"
              type="primary"
              block
              loading={loading}
            >
              Sign In
            </Button>
          </Form>
        </Card>
        <Row className="mx-auto mt-3">
          <h5 className="text-center col-lg primary small">ConDigital, Inc.</h5>
        </Row>
      </div>
    </div>
  );
};
export default LoginComponent;
