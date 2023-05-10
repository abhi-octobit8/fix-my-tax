import React from "react";
import { useState } from "react";
import { Alert, Button, Form, Input, Modal } from "antd";
// import { changePasswordService } from "../../../../services/auth.service";

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
const PaymentConfirmation = (props) => {
  const { open, onClose, onSubmit } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      setIsLoading(true);

      // await changePasswordService(values);
      await onSubmit(values.transactionNumber);

      // form.resetFields();
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
      title={"Payment Confirmation"}
    >
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Alert
          message="Please use below link for payment and put the transaction Number Here"
          style={{ marginBlockEnd: "12px" }}
          // description="Info Description Info Description Info Description Info Description"
          description={
            <a
              href={
                "https://www.onlinesbi.sbi/sbicollect/icollecthome.htm?corpID=5497814"
              }
              target="_blank"
            >
              Payment Link
            </a>
          }
          type="info"
        />

        <Form.Item
          label="Transaction Number"
          name="transactionNumber"
          rules={[{ required: true, message: "This field is required" }]}
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

export default PaymentConfirmation;
