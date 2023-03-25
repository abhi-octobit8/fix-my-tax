import React from "react";
import { Button, Card, Col, Row, Table } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import ListHeader from "../../../../common/ListHeader/ListHeader";
import { getAllTickets } from "../../../../services/ticket.service";
import { DATE_FORMATS, getLocalTime } from "../../../../shared/timeUtils";

const NewRequest = () => {
  const listData = useSelector((state) => state.request.ticketListData);
  const navigate = useNavigate();
  const RenderAttachement = (attachements) => {
    return (
      <>
        {attachements.map((item) => (
          <div className="user">{item.filename}</div>
        ))}
      </>
      // <ul>
      //   {attachements.map((item, index) => {
      //     return <li key={index}>{item.filename}</li>;
      //   })}
      // </ul>
    );
  };
  React.useEffect(() => {
    (async () => {
      await getAllTickets();
    })();
  }, []);
  const createRequest = () => {
    navigate("/request/newrequest/create");
  };
  const columns = [
    // {
    //   title: "S. No.",
    //   dataIndex: "siteName",
    //   key: "index",
    //   width: 50,
    // },

    {
      title: "Notice",
      dataIndex: "bagNumber",
      key: "bagNumber",
      width: 150,
    },
    {
      title: "Consultation Type",
      dataIndex: "question",
      key: "question",
      width: 150,
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
      title: "Time Remaining to Attend",
      dataIndex: "contactPerson",
      key: "contactPerson",
      width: 150,
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
  ];
  return (
    <Card>
      <ListHeader
        leftContent={<h2>New Request</h2>}
        rightContent={
          <Button
            type="primary"
            shape="circle"
            onClick={createRequest}
            icon={<PlusOutlined />}
          />
        }
      ></ListHeader>
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
          <Table
            bordered={true}
            columns={columns}
            scroll={{ x: "fit-content" }}
            // dataSource={newRequestData:?[]}
            dataSource={listData}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default NewRequest;
