import React from "react";
import { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { forgotPasswordService } from "../../../services/auth.service";
import { message } from "../../../shared/utils";

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
const ForgotPassword = (props) => {
  const { open, onClose } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      setIsLoading(true);

      const res = await forgotPasswordService(values);
      if (res.success) {
        message.success(res.message);
        onClose();
      } else {
        message.error(
          "There is some error. Please check Email id And try again."
        );
      }
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
      title={"Forgot Password"}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
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

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ForgotPassword;
