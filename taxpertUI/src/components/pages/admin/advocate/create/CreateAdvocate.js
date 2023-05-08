import React from "react";
import "./CreateAdvocate.less";
import { Button, Form, Input, Select, Card } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { createAdvocate } from "../../../../../services/advocate.service";
import { PATH } from "../../../../../shared/Route";
import useRedirectPath from "../../../../hooks/useRedirectPath";

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
const CreateAdvocate = (props) => {
  const navigator = useRedirectPath();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    const formData = {
      ...values,
      isActive: true,
      // roleNames: ["string"],
    };
    const res = await createAdvocate(formData);
    if (res.id) {
      navigator.goTo(PATH.ADVOCATE_LIST);
    }
  };

  return (
    <Card title="Create PSP" bordered={false}>
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
          label="SurName"
          name="surname"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="User name"
          name="username"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Email" {...formItemLayout} name={"emailAddress"}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          {...formItemLayout}
          name={"password"}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input type="password" />
        </Form.Item>

        <Form.Item
          label="ConfirmPassword"
          {...formItemLayout}
          name={"confirm"}
          rules={[
            {
              required: true,
              message: "Please input your confirm password!",
            },
          ]}
        >
          <Input type="password" />
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

export default CreateAdvocate;
