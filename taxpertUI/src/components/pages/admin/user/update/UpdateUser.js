import React from "react";
import { Button, Descriptions, Modal } from "antd";

const UpdateUser = (props) => {
  const { modalInfo, onClose } = props;

  const { open, record } = modalInfo;

  const onCancel = React.useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <Modal
      destroyOnClose
      onCancel={onCancel}
      open={open}
      style={{
        top: 30,
      }}
      footer={[
        <Button key="submit" type="primary" onClick={onCancel}>
          Okay
        </Button>,
      ]}
      title="Assessee Details"
      width={700}
    >
      <Descriptions bordered size="small">
        <Descriptions.Item label="Name" span={3}>
          {record.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="UserName" span={3}>
          {record.userName}
        </Descriptions.Item>
        <Descriptions.Item label="Email Address" span={3}>
          {record.emailAddress}
        </Descriptions.Item>
        <Descriptions.Item label="Pan Card" span={3}>
          {record.panCardNumber}
        </Descriptions.Item>
        <Descriptions.Item label="Aadhar Card" span={2}>
          {record.adharNumber}
        </Descriptions.Item>
        <Descriptions.Item label="GST Number" span={2}>
          {record.gstNumber}
        </Descriptions.Item>
      </Descriptions>
    </Modal>
  );
};

export default UpdateUser;
