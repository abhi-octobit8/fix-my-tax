import React, { useState } from "react";
import { Button, Form, Input, Select, Row, Col } from "antd";
import {
  ArrowRightOutlined,
  PhoneTwoTone,
  MailTwoTone,
} from "@ant-design/icons";
import "./ContactUs.css";
import TextArea from "antd/lib/input/TextArea";
import { phoneNumberValidator } from "../../../shared/validator";
import { contactUsService } from "../../../services/register.service";
import SeoHeader from "../../../common/seo/SeoHeader";
import { TAGS } from "../../../shared/constant/Tags";
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

const ContactUs = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      debugger;
      setIsLoading(true);
      const res = await contactUsService(values);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
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
      <SeoHeader
        title={TAGS.contact_us.title}
        description={TAGS.contact_us.decription}
      />
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
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
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
                label="Feedback"
                name="feedback"
                rules={[{ required: true, message: "This field is required" }]}
              >
                <TextArea showCount maxLength={100} />
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
          <Col className="content-padding" xs={24} md={12} lg={12} sm={24}>
            <h6 style={{ fontSize: "20px" }}>Happy To Help</h6>

            <PhoneTwoTone />
            <span style={{ marginLeft: "8px" }}>+91 6387022844</span>
            <br />

            <MailTwoTone />
            <span style={{ marginLeft: "11px" }}>contact@fixmytax.in</span>
            <br />
            <ArrowRightOutlined />
            <span style={{ marginLeft: "11px" }}>
              (Available: Monday to Friday: 10:00 am to 6:00 pm)
            </span>
            <br />
          </Col>
        </Row>
      </div>
    </>
  );
};
export default ContactUs;
