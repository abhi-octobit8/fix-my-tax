import React from "react";
import { Button, Card, Col, Row, Space } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ListHeader from "../../../../common/ListHeader/ListHeader";
import { useSelector } from "react-redux";
import Tag from "antd/es/tag";
import { getAllEmployer } from "../../../../services/employer.service";
import FixMyTaxTable from "../../../../common/Table/FixMyTaxTable";
import { useState } from "react";
import AssignTicket from "./AssignTicket";

const TicketListRequest = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const requestList = useSelector((state) => state.employer?.employerListData);
  React.useEffect(() => {
    (async () => {
      await getAllEmployer();
    })();
  }, []);

  const onHandleAssignTicket = React.useCallback((formValues) => {
    setIsModelOpen(true);
  }, []);

  const OnHandleCancel = React.useCallback((formValues) => {
    setIsModelOpen(false);
  }, []);
  const columns = [
    {
      title: "UserName",
      dataIndex: "userName",
      key: "userName",
      width: 150,
      render: (text) => <div>{text}</div>,
    },
    {
      title: "FullName",
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (text) => <div>{text}</div>,
    },
    {
      title: "EmailAddress",
      dataIndex: "emailAddress",
      key: "emailAddress",
      width: 150,
      render: (text) => <div>{text}</div>,
    },
    {
      title: "IsActive",
      dataIndex: "isActive",
      key: "isActive",
      width: 150,
      render: (text) =>
        text === true ? (
          <Tag color="#2db7f5">{"Yes"}</Tag>
        ) : (
          <Tag color="red">{"No"}</Tag>
        ),
    },
    {
      title: "Actions",
      dataIndex: "productId",
      fixed: "right",
      align: "center",
      width: 160,
      render: (productId) => {
        return (
          <Space>
            <Button type="default" onClick={onHandleAssignTicket}>
              Assign
            </Button>
            <DeleteOutlined title="Delete" style={{ color: "red" }} />
          </Space>
        );
      },
    },
  ];
  return (
    <React.Fragment>
      <Card>
        <ListHeader leftContent={<h2>All Request</h2>}></ListHeader>
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
            <FixMyTaxTable columns={columns} dataSource={requestList} />
          </Col>
        </Row>
      </Card>
      <AssignTicket open={isModelOpen} onClose={OnHandleCancel} />
    </React.Fragment>
  );
};

export default TicketListRequest;
