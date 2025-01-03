import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Button, Card, Col, Dropdown, Row, Space, Tag } from "antd";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import {
  deleteAdvocate,
  getAllAdvocate,
} from "../../../../services/advocate.service";
import FixMyTaxTable from "../../../../common/Table/FixMyTaxTable";
import { getRandomString } from "../../../../shared/utils";
import ListHeader from "../../../../common/ListHeader/ListHeader";
import CreateEditPSP from "./create-edit/CreateEditPSP";
import { MODE } from "./create-edit/constant";
import ResetAdvocatePassword from "./reset-password/ResetAdvocatePassword";

const AdvocateList = () => {
  const [listUpdate, setListUpdate] = useState();
  const [openModalResetInfo, setOpenModalResetInfo] = useState({
    open: false,
    record: {},
  });
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

  const OnHandleCancel = React.useCallback((formValues) => {
    setModelInfoOpen((prevState) => ({
      ...prevState,
      open: false,
    }));
  }, []);

  const OnHandleResetCancel = React.useCallback((formValues) => {
    setOpenModalResetInfo((prevState) => ({
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
      key: "reset",
      label: "Reset Password",
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
      render: (id, row) => {
        return (
          <Space size="middle">
            <Dropdown
              menu={{
                items,
                onClick: (e) => {
                  // eslint-disable-next-line default-case
                  switch (e.key) {
                    case "edit":
                      // console.log(id);
                      setModelInfoOpen({
                        open: true,
                        mode: MODE.EDIT,
                        record: row,
                      });
                      break;
                    case "reset":
                      setOpenModalResetInfo({
                        open: true,
                        record: row,
                      });
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
      <ResetAdvocatePassword
        modelInfo={openModalResetInfo}
        onClose={OnHandleResetCancel}
      ></ResetAdvocatePassword>
    </React.Fragment>
  );
};

export default AdvocateList;
