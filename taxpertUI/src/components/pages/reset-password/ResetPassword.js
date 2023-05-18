import React, { useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Form, Input, message, Row } from "antd";
import "./ResetPassword.less";
import { PATH } from "../../../shared/Route";
import { resetUserPasswordService } from "../../../services/auth.service";
import { getResetToken } from "../../../shared/utils";
import { passwordValidator } from "../../../shared/validator";

const ResetPassword = (props) => {
  const location = useLocation(); // React Hook
  const token = getResetToken(location.pathname);
  const navigate = useNavigate();
  const form = useRef();

  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      const resetData = {
        emailAddress: values.emailAddress,
        token: token,
        newPassword: values.newPassword,
      };
      setLoading(true);
      const res = await resetUserPasswordService(resetData);
      if (res.success) {
        message.success(res.message);
        navigate(PATH.LOGIN);
      } else {
        message.error(
          "There is some error. Please check Email id And try again."
        );
      }

      // navigate(PATH.LOGIN);
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
              name="emailAddress"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                passwordValidator,
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

export default ResetPassword;
