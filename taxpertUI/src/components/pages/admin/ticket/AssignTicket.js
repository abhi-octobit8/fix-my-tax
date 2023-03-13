import { Form, Select, Space } from "antd";
import Button from "antd/es/button";
// import Form from "antd/lib/form/Form";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { requiredValidator } from "../../../../shared/validator";

const AssignTicket = (props) => {
  const { open, onClose } = props;
  const [form] = Form.useForm();
  const onFormSubmit = React.useCallback(
    (formValues) => {
      console.log(formValues);

      form.resetFields();
      onClose();
    },
    [onClose]
  );
  return (
    <Modal
      destroyOnClose
      footer=""
      onCancel={onClose}
      open={open}
      title={<h3>Assign Ticket</h3>}
    >
      <Form form={form} layout="vertical" onFinish={onFormSubmit}>
        <Form.Item label="Advocate" name="advocate" rules={[requiredValidator]}>
          <Select
            showSearch
            allowClear
            options={[
              {
                value: "lucy1",
                label: "Lucy1",
              },
              {
                value: "lucy2",
                label: "Lucy2",
              },
              {
                value: "lucy3",
                label: "Lucy3",
              },
              {
                value: "lucy4",
                label: "Lucy4",
              },
            ]}
          />
        </Form.Item>

        <Space>
          <Button onClick={onClose} type="text">
            Cancel
          </Button>

          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Space>
      </Form>
    </Modal>
  );
};

export default AssignTicket;
