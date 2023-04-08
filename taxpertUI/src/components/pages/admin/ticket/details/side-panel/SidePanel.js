import React from "react";
import { Space } from "antd";
import UpdateTicketStatus from "./UpdateTicketStatus";
import { TicketStatus } from "../../../../../../shared/constants";
import { getKeyFromObject } from "../../../../../../shared/utils";
import { useState } from "react";

const SidePanel = ({ ticketdetailsData }) => {
  const { status, id } = ticketdetailsData;
  const [editState, setEditState] = useState(false);
  const statusValue = getKeyFromObject(TicketStatus, status);
  debugger;
  return (
    <Space direction={"vertical"} style={{ width: "100%" }}>
      <UpdateTicketStatus
        statusValue={statusValue}
        editState={editState}
        setEditState={setEditState}
        id={id}
      />
      <div>
        <span>
          <strong>PSP : </strong>shamsher
        </span>
      </div>
    </Space>
  );
};

export default SidePanel;
