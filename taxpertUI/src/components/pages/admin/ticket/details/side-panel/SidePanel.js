import React from "react";
import { Space } from "antd";
import UpdateTicketStatus from "./UpdateTicketStatus";
import { TicketStatus } from "../../../../../../shared/constants";
import { getKeyFromObject } from "../../../../../../shared/utils";
import { useState } from "react";

const SidePanel = ({ ticketdetailsData }) => {
  const { status, id, assignedUserName, transactionNumber } = ticketdetailsData;
  const [editState, setEditState] = useState(false);
  const statusValue = getKeyFromObject(TicketStatus, status);
  return (
    <Space direction={"vertical"} style={{ width: "100%" }}>
      <div>
        <span>
          <strong>Transaction Number </strong>
          <br />
          {transactionNumber}
        </span>
      </div>
      <UpdateTicketStatus
        statusValue={statusValue}
        editState={editState}
        setEditState={setEditState}
        id={id}
      />
      <div>
        <span>
          <strong>PSP : </strong>
          {assignedUserName}
        </span>
      </div>
    </Space>
  );
};

export default SidePanel;
