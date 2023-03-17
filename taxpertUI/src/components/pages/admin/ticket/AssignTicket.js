import { Form, Select, Space } from "antd";
import Button from "antd/es/button";
// import Form from "antd/lib/form/Form";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { useSelector } from "react-redux";
import { getAllAdvocate } from "../../../../services/advocate.service";
import { requiredValidator } from "../../../../shared/validator";
const { Option } = Select;

const AssignTicket = (props) => {
  const { open, onClose } = props;
  const advocateList = useSelector((state) => state.advocate?.advocateListData);

  React.useEffect(() => {
    (async () => {
      if (open) {
        await getAllAdvocate();
      }
    })();
  }, [open]);
  const [form] = Form.useForm();
  const onFormSubmit = React.useCallback(
    (formValues) => {
      console.log(formValues);

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
          <Select placeholder="Select your Section Type" allowClear>
            {advocateList.map((x, i) => {
              return (
                <Option value={x.id} key={i}>
                  {x.userName}
                </Option>
              );
            })}
          </Select>
          {/* <Select
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
          /> */}
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
