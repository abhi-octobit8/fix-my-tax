import React from "react";
import { Button, Card, Col, Row, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ListHeader from "../../../../common/ListHeader/ListHeader";
import { useSelector } from "react-redux";

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
    <Card>
      <ListHeader leftContent={<h2>DashBoard</h2>}></ListHeader>
      <Row>
        <Col sm={{ span: 10, offset: 0 }}></Col>
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Col
          xs={{ span: 24, offset: 0 }}
          sm={{ span: 24, offset: 0 }}
          md={{ span: 24, offset: 0 }}
          lg={{ span: 24, offset: 0 }}
          xl={{ span: 24, offset: 0 }}
          xxl={{ span: 24, offset: 0 }}
        >
          <Table bordered={true} columns={columns} />
        </Col>
      </Row>
    </Card>
  );
};

export default DashBoard;
