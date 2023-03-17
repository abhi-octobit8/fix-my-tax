import { Form, Select, Space } from "antd";
import Button from "antd/es/button";
// import Form from "antd/lib/form/Form";
import Modal from "antd/lib/modal/Modal";
import React from "react";
import { useSelector } from "react-redux";
import { getAllAdvocate } from "../../../../services/advocate.service";
import { updateAssignment } from "../../../../services/ticket.service";
import { requiredValidator } from "../../../../shared/validator";
import useUserData from "../../../hooks/useUserData";
const { Option } = Select;

const AssignTicket = (props) => {
  const { modelInfo, onClose } = props;
  const { open, record } = modelInfo;
  const userData = useUserData();
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
    async (formValues) => {
      console.log(formValues);

      const formData = {
        ticketIds: [record.id],
        assignUserId: formValues.advocate,
      };

      const res = await updateAssignment(formData);
      onClose();
    },
    [onClose, record]
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
        <Form.Item label="PSP" name="advocate" rules={[requiredValidator]}>
          <Select placeholder="Select your PSP" allowClear>
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
