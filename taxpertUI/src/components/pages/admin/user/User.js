import React from "react";
import { Button, Card, Col, Row, Space } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ListHeader from "../../../../common/ListHeader/ListHeader";
import { useSelector } from "react-redux";
import Tag from "antd/es/tag";
import { getAllUsers } from "../../../../services/user.service";
import FixMyTaxTable from "../../../../common/Table/FixMyTaxTable";
import useRedirectPath from "../../../hooks/useRedirectPath";
import { PATH } from "../../../../shared/Route";

const UserComponent = () => {
  const navigator = useRedirectPath();
  const requestList = useSelector((state) => state.user?.userListData);
  React.useEffect(() => {
    (async () => {
      await getAllUsers();
    })();
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
    // {
    //   title: "Actions",
    //   dataIndex: "productId",
    //   fixed: "right",
    //   align: "center",
    //   width: 60,
    //   render: (productId) => {
    //     return (
    //       <Space>
    //         <DeleteOutlined title="Delete" style={{ color: "red" }} />
    //       </Space>
    //     );
    //   },
    // },
  ];
  return (
    <Card>
      <ListHeader leftContent={<h2>Assessee</h2>}></ListHeader>
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
  );
};

export default UserComponent;
