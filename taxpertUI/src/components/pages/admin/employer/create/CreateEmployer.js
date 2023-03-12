import React from "react";
import "./CreateEmployer.less";
import { Button, Form, Input, Select, Card } from "antd";
import TextArea from "antd/lib/input/TextArea";

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
      span: 14,
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
const CreateEmployer = (props) => {
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    console.log("registration values:", values);
  };

  return (
    <Card title="Create Employer" bordered={false}>
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
          label="Subject"
          name="name"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Type"
          name="surname"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Select
            defaultValue="itr-notice"
            style={{
              width: 120,
            }}
            options={[
              {
                value: "itr-notice",
                label: "ITR Notice",
              },
              {
                value: "gst-notice",
                label: "GST Notice",
              },
            ]}
          />
        </Form.Item>
        <Form.Item
          label="Query"
          name="query"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <TextArea showCount maxLength={500} />
        </Form.Item>
        <Form.Item
          label="Attachment"
          {...formItemLayout}
          name={"attachment"}
          rules={[{ required: true, message: "This field is required" }]}
        >
          <input className="FileInput" type="file" />
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

export default CreateEmployer;
