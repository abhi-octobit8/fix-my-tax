import React, { useState } from "react";
import "./NoticeFormPage.less";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Card,
  Upload,
} from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import API from "../../../../shared/API";
import { NOTICE_TYPE } from "../constant";
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
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
const NoticeFormPage = (props) => {
  const { titleHeader = "Notice", noticeType = NOTICE_TYPE.GENERAL } = props;
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
  const suffixSelector = (
    <Form.Item name="suffix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="USD">$</Option>
        <Option value="CNY">¥</Option>
      </Select>
    </Form.Item>
  );
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  return (
    <Card className="card-container" bordered={true}>
      <div className="Card-header-title">
        <h1>{titleHeader}</h1>
      </div>
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
        {noticeType == NOTICE_TYPE.GENERAL && (
          <React.Fragment>
            <Form.Item
              name="service"
              label="Service Type"
              rules={[
                {
                  required: true,
                  message: "Please select Service Type!",
                },
              ]}
            >
              <Select placeholder="Select your Service Type">
                <Option value="video">Video Consultation</Option>
                <Option value="reply">Return Reply</Option>
              </Select>
            </Form.Item>

            <Form.Item
              name="uploadNotice"
              label="Upload Notice"
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
              name="uploadITR"
              label="Upload ITR"
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
          </React.Fragment>
        )}

        {noticeType == NOTICE_TYPE.CONSULTATION && (
          <React.Fragment>
            <Form.Item
              name="uploadConsultationNotice"
              label="Upload Document"
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
          </React.Fragment>
        )}
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

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default NoticeFormPage;
