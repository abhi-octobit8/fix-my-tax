import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Input, Row } from "antd";
import "./Login.less";
import API from "../../../shared/API";
import { checkLogin, doLogin } from "../../../store/authentication/AuthActions";
import { PATH } from "../../../shared/Route";

const Login = (props) => {
  const navigate = useNavigate();
  const form = useRef();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      const loginData = {
        userNameOrEmailAddress: values.username,
        password: values.password,
      };
      setLoading(true);
      const loginResponse = await API({
        method: "post",
        url: "/TokenAuth/Authenticate",

        body: loginData,
      });
      doLogin({ ...loginResponse });
      await checkLogin(loginResponse.userId);

      setLoading(false);
      navigate(PATH.TICKET_REQUEST_LIST);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card className="card-container" bordered={true}>
      <Row>
        <Col sm={{ span: 10, offset: 0 }}>
          <h3>Login</h3>

          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </Col>
        <Col sm={{ span: 10, offset: 0 }}></Col>
      </Row>
    </Card>
  );
};

export default Login;
