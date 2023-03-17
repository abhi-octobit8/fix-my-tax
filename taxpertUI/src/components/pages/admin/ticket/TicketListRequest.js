import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, Col, Row, Space } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import Tag from "antd/es/tag";
import useRedirectPath from "../../../hooks/useRedirectPath";
import FixMyTaxTable from "../../../../common/Table/FixMyTaxTable";
import AssignTicket from "./AssignTicket";
import ListHeader from "../../../../common/ListHeader/ListHeader";
import { getAllTickets } from "../../../../services/ticket.service";
import { DATE_FORMATS, getLocalTime } from "../../../../shared/timeUtils";
import { getKeyFromObject } from "../../../../shared/utils";
import { ServiceType } from "../../services/constant";

const TicketListRequest = () => {
  const navigator = useRedirectPath();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const requestList = useSelector((state) => state.request.ticketListData);
  React.useEffect(() => {
    (async () => {
      await getAllTickets();
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
      title: "Request",
      dataIndex: "section",
      key: "section",
      width: 250,
      // render: (text, value) => <div>{text}</div>,
      render: (text, value) => {
        return (
          <Space>
            <span>{value.section}</span>
            <span>{value.subSection}</span>
          </Space>
        );
      },
    },
    {
      title: "Service",
      dataIndex: "serviceType",
      key: "serviceType",
      width: 150,
      // render: (text) => <div>{text}</div>,
      render: (text, value) => {
        return <span>{getKeyFromObject(ServiceType, text)}</span>;
      },
    },
    {
      title: "Creation Time",
      dataIndex: "creationTime",
      key: "creationTime",
      width: 150,
      render: (value) =>
        getLocalTime(value, DATE_FORMATS.LIST_DATE_TIME_FORMAT),
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "isActive",
      width: 150,
      render: (text) =>
        text === true ? (
          <Tag color="#2db7f5">{"Yes"}</Tag>
        ) : (
          <Tag color="#2db7f5">{"new"}</Tag>
        ),
    },
    {
      title: "Attachement",
      dataIndex: "attachments",
      key: "attachments",
      width: 150,
      // render: (value) => {
      //   return <RenderAttachement attachements={value}></RenderAttachement>;
      // },
      render: (value) => value.map((item) => item.filename).join(),
    },
    {
      title: "Actions",
      dataIndex: "productId",
      fixed: "right",
      align: "center",
      width: 160,
      render: (productId) => {
        return (
          <Space onClick={(event) => event.stopPropagation()}>
            <Button type="default" onClick={onHandleAssignTicket}>
              Assign
            </Button>
            <DeleteOutlined title="Delete" style={{ color: "red" }} />
          </Space>
        );
      },
    },
  ];

  const onRowClick = (record) => {
    return {
      onClick: (e) => {
        navigator.goTo(`/admin/requests/details/${record.id}`);
      },
    };
  };

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
            <FixMyTaxTable
              size="small"
              columns={columns}
              dataSource={requestList}
              onRow={(record) => onRowClick(record)}
            />
          </Col>
        </Row>
      </Card>
      <AssignTicket open={isModelOpen} onClose={OnHandleCancel} />
    </React.Fragment>
  );
};

export default TicketListRequest;
