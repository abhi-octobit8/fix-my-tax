import React from "react";
import { Button, Card, Col, Dropdown, Row, Space } from "antd";
import { DeleteOutlined, MoreOutlined, PlusOutlined } from "@ant-design/icons";
import ListHeader from "../../../../common/ListHeader/ListHeader";
import { useSelector } from "react-redux";
import Tag from "antd/es/tag";
import {
  deleteAdvocate,
  getAllAdvocate,
} from "../../../../services/advocate.service";
import FixMyTaxTable from "../../../../common/Table/FixMyTaxTable";
import { PATH } from "../../../../shared/Route";
import { getRandomString } from "../../../../shared/utils";
import useRedirectPath from "../../../hooks/useRedirectPath";
import { useState } from "react";
import CreateEditPSP from "./create-edit/CreateEditPSP";
import { MODE } from "./create-edit/constant";

const AdvocateList = () => {
  const navigator = useRedirectPath();
  const [listUpdate, setListUpdate] = useState();
  const [modelInfoOpen, setModelInfoOpen] = useState({
    open: false,
    mode: MODE.CREATE,
    record: {},
  });
  const requestList = useSelector((state) => state.advocate?.advocateListData);
  React.useEffect(() => {
    (async () => {
      await getAllAdvocate();
    })();
  }, [listUpdate]);

  const callDeleteAdvocate = async (id) => {
    try {
      if (
        window.confirm("Are you sure, you want to delete data for this PSP?")
      ) {
        await deleteAdvocate(id);
        setListUpdate(getRandomString());
      }
    } catch (e) {}
  };

  // const onHandleCreate = React.useCallback((record) => {
  //   setModelInfoOpen({ open: true, mode: MODE.CREATE, record });
  // }, []);

  const OnHandleCancel = React.useCallback((formValues) => {
    setModelInfoOpen((prevState) => ({
      ...prevState,
      open: false,
    }));
  }, []);

  const items = [
    {
      key: "edit",
      label: "Edit",
    },
    {
      key: "delete",
      label: "Delete",
    },
  ];
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
      dataIndex: "id",
      fixed: "right",
      align: "center",
      width: 60,
      render: (id) => {
        return (
          <Space size="middle">
            <Dropdown
              menu={{
                items,
                onClick: (e) => {
                  // eslint-disable-next-line default-case
                  switch (e.key) {
                    case "edit":
                      console.log(id);
                      break;
                    case "delete":
                      callDeleteAdvocate(id);
                      break;
                  }
                },
              }}
              placement="bottomRight"
              arrow={{
                pointAtCenter: true,
              }}
            >
              <a>
                <MoreOutlined />
              </a>
            </Dropdown>
          </Space>
        );
      },
    },
  ];
  return (
    <React.Fragment>
      {" "}
      <Card>
        <ListHeader
          leftContent={<h2>Professional Service Provider</h2>}
          rightContent={
            <Button
              type="primary"
              shape="circle"
              // onClick={() => navigator.goTo(PATH.CREATE_ADVOCATE)}
              onClick={() =>
                setModelInfoOpen({ open: true, mode: MODE.CREATE, record: {} })
              }
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
            <FixMyTaxTable columns={columns} dataSource={requestList} />
          </Col>
        </Row>
      </Card>
      <CreateEditPSP
        modelInfo={modelInfoOpen}
        onClose={OnHandleCancel}
        setListUpdate={setListUpdate}
      ></CreateEditPSP>
    </React.Fragment>
  );
};

export default AdvocateList;
