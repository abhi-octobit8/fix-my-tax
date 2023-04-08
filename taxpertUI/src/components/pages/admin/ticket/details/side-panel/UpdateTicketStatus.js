import React, { useState } from "react";
import { Button, Dropdown, Menu, Tag } from "antd";
import { EditOutlined, DownOutlined } from "@ant-design/icons";
// import { updateOrderStatusData } from "../../shared/creditMemo-service";
import { useDispatch, useSelector } from "react-redux";
import { updateTicketStatus } from "../../../../../../services/ticket.service";
import { TicketStatus } from "../../../../../../shared/constants";
import { message } from "../../../../../../shared/utils";
// import { setUpdatedStatusOnOrderDetails } from "../../redux/action/creditMemoRMAActions";

const STATUSES = {
  New: "New",
  Assigned: "Assigned",
  Responded: "Responded",
  Reopen: "Reopen",
  Resolved: "Resolved",
  Closed: "Closed",
};

export default function UpdateTicketStatus({
  editState,
  setEditState,
  statusValue = "Closed",
  id,
}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const updateStatus = async (status) => {
    const { key } = status;
    const value = TicketStatus[key];
    const formData = {
      status: value,
    };
    const res = await updateTicketStatus(formData, id);
    if (res) {
      message.success("Status Updated successfully.");
    }
    console.log("shamsher", key);
    setLoading(true);
    setEditState(false);
    setLoading(false);
  };

  const statusItems = () => {
    const result = Object.keys(STATUSES).map((statusKey) => {
      return {
        label: statusKey,
        key: statusKey,
      };
    });
    return result;
  };

  return (
    <>
      <strong>Status </strong>: &nbsp;
      {!editState ? (
        <>
          <Tag color="#2db7f5">{statusValue}</Tag>
          <Button
            style={{ padding: "0px 6px", marginLeft: -5 }}
            onClick={() => {
              setEditState(true);
            }}
            type={"link"}
          >
            <EditOutlined />
          </Button>
        </>
      ) : null}
      {editState ? (
        <Dropdown
          menu={{
            items: statusItems(),
            onClick: updateStatus,
          }}
          trigger={["click"]}
        >
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            {statusValue} <DownOutlined />
          </a>
        </Dropdown>
      ) : null}
    </>
  );
}
