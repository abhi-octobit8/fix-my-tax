import React from "react";
import { Button, Card, Col, Row, Table } from "antd";
import { PlusOutlined, ClusterOutlined } from "@ant-design/icons";
import ListHeader from "../../../../common/ListHeader/ListHeader";
import { useSelector } from "react-redux";

import "./DashBoard.less";

const DashBoard = () => {
  const requestList = useSelector((state) => state.request?.newRequestList);
  console.log("requestList", requestList);
  const columns = [
    {
      title: "S. No.",
      dataIndex: "siteName",
      key: "index",
      width: 50,
    },

    {
      title: "Request",
      dataIndex: "siteName",
      key: "siteName",
      width: 100,
    },

    {
      title: "Date & Time of Receipt",
      dataIndex: "location",
      key: "location",
      width: 150,
    },
    {
      title: "Date & Time of Opening",
      dataIndex: "location",
      key: "location",
      width: 150,
    },
    {
      title: "Time Remaining to Attend",
      dataIndex: "contactPerson",
      key: "contactPerson",
      width: 150,
    },
    {
      title: "Attachement",
      dataIndex: "contactNumber",
      key: "contactNumber",
      width: 150,
    },
  ];
  return (
    <Card className="dashboard-card-container">
      <ListHeader leftContent={<h2>DashBoard</h2>}></ListHeader>

      <div className="content-padding dashboard-card-content">
        {" "}
        <ClusterOutlined />
        Coming Soon
      </div>
    </Card>
  );
};

export default DashBoard;
