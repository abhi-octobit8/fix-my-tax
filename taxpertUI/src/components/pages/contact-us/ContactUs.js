import React from "react";
import { Button, Form, Input, Select, Upload, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./ContactUs.css";
import TextArea from "antd/lib/input/TextArea";
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
      span: 12,
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
const ContactUs = () => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("registration values:", values);
    debugger;
    // const registerData = {
    //   values,
    //   isActive: true,
    //   roleNames: ["string"],
    // };
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
    <>
      <h3 className="top-head">Contact Us</h3>
      <div className="contact-page">
        <Row className="contact-us-container">
          <Col className="content-padding" xs={24} md={12} lg={12} sm={24}>
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
                label="Enter First Name"
                name="name"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Enter Last Name"
                name="lastName"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Input />
              </Form.Item>
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
                name="uploadNotice"
                label="Upload "
                valuePropName="fileList"
                getValueFromEvent={normFile}
              >
                <Upload
                  beforeUpload={(file) => {
                    // console.log(file);
                    return false;
                  }}
                  multiple={false}
                >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>

              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
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
                label="Query"
                name="query"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <TextArea />
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col className="content-padding" xs={24} md={12} lg={12} sm={24}>
            <h6 style={{ fontSize: "20px" }}>We are here to help</h6>

            <img
              src="https://media.istockphoto.com/id/1218145182/vector/blue-phone-icon-symbol-in-trendy-flat-style-isolated-on-white-background-telephone-logo-and.jpg?s=170667a&w=0&k=20&c=fRGLeIX_unLtmu7MvCHBnP2CPFhiTu1GxoWDq31683g="
              alt="location icon"
              width="40px"
              height="55px"
            />
            <span style={{ marginLeft: "8px" }}>+91 9839441144</span>
            <br />
            <img
              src="https://www.seekpng.com/png/small/0-9454_mail-icon-png-white-circle-dash-coin-logo.png"
              alt="location icon"
              width="40px"
              height="40px"
            />
            <span style={{ marginLeft: "11px" }}>contact@fixmytax.in</span>
            <br />
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ContactUs;
