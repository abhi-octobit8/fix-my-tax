import React from "react";
import { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { resetAdvocatePassword } from "../../../../../services/advocate.service";

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
const ResetAdvocatePassword = (props) => {
  const { modelInfo, onClose } = props;
  const { open, record } = modelInfo;
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    debugger;
    try {
      setIsLoading(true);

      const formData = {
        ...values,
        userId: record.id,
      };

      await resetAdvocatePassword(formData);

      form.resetFields();
      onClose();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const onCancel = React.useCallback(() => {
    form.resetFields();
    onClose();
  }, [form, onClose]);

  return (
    <Modal
      destroyOnClose
      footer=""
      onCancel={onCancel}
      open={open}
      style={{
        top: 30,
      }}
      title={"Change Password"}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          label="Your Current Password"
          name="adminPassword"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="New Password"
          name="newPassword"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ResetAdvocatePassword;
