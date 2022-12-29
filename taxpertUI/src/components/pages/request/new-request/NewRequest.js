import React from "react";
import { Button, Card, Col, Row, Table } from "antd";
import { useSelector } from "react-redux";

import { PlusOutlined } from "@ant-design/icons";
import ListHeader from "../../../../common/ListHeader/ListHeader";
import { getNewRequest } from "../../../../services/request.service";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../../../shared/Route";

const NewRequest = () => {
  // const newRequestData = useSelector((state) => state.request.newRequestList);
  const navigate = useNavigate();

  React.useEffect(() => {
    (async () => {
      const data = await getNewRequest();
    })();
  }, []);
  const createRequest = () => {
    navigate("/request/newrequest/create");
  };
  const columns = [
    {
      title: "S. No.",
      dataIndex: "siteName",
      key: "index",
      width: 50,
    },

    {
      title: "Request",
      dataIndex: "bagNumber",
      key: "bagNumber",
      width: 150,
    },

    {
      title: "Date & Time of Receipt",
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
            dataSource={[]}
          />
        </Col>
      </Row>
    </Card>
  );
};

export default NewRequest;
