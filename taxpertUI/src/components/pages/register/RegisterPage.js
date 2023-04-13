import React, { useState } from "react";
import "./RegisterPage.less";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Select,
  Card,
  Row,
  Col,
  Upload,
} from "antd";
import API from "../../../shared/API";
import { UploadOutlined } from "@ant-design/icons";
import { phoneNumberValidator } from "../../../shared/validator";
import { Header3 } from "../../../common/Headers";
import { REGISTER_CATEGORIES } from "./constant";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const RegisterPage = (props) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("registration values:", values);

    const registerData = {
      values,
      isActive: true,
      roleNames: ["string"],
    };

    const register = await API({
      method: "post",
      url: "/services/app/user/create",
      body: registerData,
    });
    // doLogin({ ...loginResponse });
    // await checkLogin(loginResponse.userId);

    // setLoading(false);
    // navigate("/request/newrequest");
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

  return (
    <Card className="card-container" bordered={true}>
      <Row className="content-margin-tab">
        {" "}
        <Col span={8} offset={6}>
          <Header3>Registration</Header3>
        </Col>
      </Row>
      <div offset={8}></div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["zhejiang", "hangzhou", "xihu"],
          prefix: "91",
        }}
        scrollToFirstError
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          label="Surname"
          name="surname"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input />
        </Form.Item> */}
        {/* <Form.Item
          label="UserName"
          name="username"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input />
        </Form.Item> */}

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
          label="Pan Card No"
          name="panNumber"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input />
        </Form.Item>

        {/* <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
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
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item> */}

        <Form.Item
          name="category"
          label="Category"
          rules={[
            {
              required: true,
              message: "Please select Category!",
            },
          ]}
        >
          <Select placeholder="Select Your Category" showSearch>
            {REGISTER_CATEGORIES.map((x, i) => {
              return (
                <Option value={x.value} key={i}>
                  {x.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item noStyle shouldUpdate>
          {({ getFieldValue }) => {
            const value = getFieldValue("category");
            if (value && value !== 1) {
              return (
                <Form.Item
                  name="uploadDocument"
                  label="Upload Document"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  extra="To verify the Category upload required Document"
                  rules={[
                    {
                      required: true,
                      message: "Please upload Document to verified document",
                    },
                  ]}
                >
                  <Upload
                    beforeUpload={(file) => {
                      return false;
                    }}
                    multiple={false}
                    maxCount={1}
                  >
                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                  </Upload>
                </Form.Item>
              );
            }
            return null;
          }}
        </Form.Item>
        {/* <React.Fragment>
          <Form.Item
            name="uploadDocument"
            label="Upload Document"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload
              beforeUpload={(file) => {
                return false;
              }}
              multiple={false}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>
        </React.Fragment> */}
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
            phoneNumberValidator,
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
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
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="">agreement</a>
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegisterPage;
