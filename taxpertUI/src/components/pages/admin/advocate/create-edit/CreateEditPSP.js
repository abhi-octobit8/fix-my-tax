import React from "react";
import { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { createAdvocate } from "../../../../../services/advocate.service";
import { getRandomString } from "../../../../../shared/utils";
import { MODE } from "./constant";

import "./CreateEditPSP.less";

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
const CreateEditPSP = (props) => {
  const { modelInfo, onClose, setListUpdate } = props;

  const [isLoading, setIsLoading] = useState(false);
  const { open, mode, record } = modelInfo;
  const [form] = Form.useForm();

  React.useEffect(() => {
    if (mode === MODE.EDIT) {
      form.setFieldsValue({
        ...record,
      });
    }
  }, [form, mode, record]);

  const onFinish = async (values) => {
    try {
      setIsLoading(true);
      const formData = {
        ...values,
        isActive: true,
      };
      let res = {};
      if (mode === MODE.CREATE) {
        res = await createAdvocate(formData);
      } else {
        //call update api
        // res = await updateAdvocate(formData);
      }
      if (res.id) {
        setListUpdate(getRandomString());
      }
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
      title={mode === MODE.CREATE ? "Create PSP" : "Edit PSP"}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
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
          name="userName"
          rules={[{ required: true, message: "This field is required" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Email" {...formItemLayout} name={"emailAddress"}>
          <Input />
        </Form.Item>
        {mode != MODE.EDIT && (
          <>
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
          </>
        )}

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={isLoading}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateEditPSP;
