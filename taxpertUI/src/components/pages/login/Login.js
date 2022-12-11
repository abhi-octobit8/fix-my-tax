import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Card, Checkbox, Col, Form, Input, Row } from "antd";
import CheckButton from "react-validation/build/button";
import "./Login.less";
import API from "../../../shared/API";
import { doLogin } from "../../../store/authentication/AuthActions";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = (props) => {
  const navigate = useNavigate();
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // const { isLoggedIn } = useSelector((state) => state.auth);
  // const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };
  const onFinish = async (values) => {
    console.log("Success:", values);
    const loginData = {
      userNameOrEmailAddress: values.username,
      password: values.password,
    };
    const loginResponse = await API({
      method: "post",
      url: "/TokenAuth/Authenticate",
      body: loginData,
    });
    doLogin({ ...loginResponse });
    setLoading(false);
    navigate("/request/newrequest");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      // dispatch(login(username, password))
      //   .then(() => {
      //     props.history.push("/profile");
      //     window.location.reload();
      //   })
      //   .catch(() => {
      //     setLoading(false);
      //   });
      const loginData = {
        userNameOrEmailAddress: username,
        password,
      };
      debugger;
      const loginResponse = await API({
        method: "post",
        url: "/TokenAuth/Authenticate",
        body: loginData,
      });
      doLogin({ ...loginResponse });
      setLoading(false);

      debugger;
    } else {
      setLoading(false);
    }
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
