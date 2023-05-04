import React, { useState } from "react";
import { Button, Card, Col, Dropdown, Row, Space } from "antd";
import { DeleteOutlined, PlusOutlined, MoreOutlined } from "@ant-design/icons";
import ListHeader from "../../../../common/ListHeader/ListHeader";
import { useSelector } from "react-redux";
import Tag from "antd/es/tag";
import {
  getAllUsers,
  postUserActivate,
} from "../../../../services/user.service";
import FixMyTaxTable from "../../../../common/Table/FixMyTaxTable";
import useRedirectPath from "../../../hooks/useRedirectPath";
import { PATH } from "../../../../shared/Route";
import {
  downloaFile,
  getMenuActionItems,
  getRandomString,
} from "../../../../shared/utils";
import { ACTION_ITEMS, USER_LIST_ACTION } from "./constant";
import useUserRole from "../../../hooks/useUserRole";
import UpdateUser from "./update/UpdateUser";

const UserComponent = () => {
  const navigator = useRedirectPath();
  const userRole = useUserRole();
  const [listUpdate, setListUpdate] = useState(false);
  const [modalInfoOpen, setModalInfoOpen] = useState({
    open: false,
    record: {},
  });
  const requestList = useSelector((state) => state.user?.userListData);
  React.useEffect(() => {
    (async () => {
      await getAllUsers();
    })();
  }, [listUpdate]);

  const onHandleActivate = React.useCallback(async (record) => {
    // setModelInfoOpen({ open: true, record });
    debugger;
    const body = {
      id: record.id,
    };
    await postUserActivate(body);
    setListUpdate(getRandomString());
  }, []);

  const onHandleDownloadCategoryProofFile = React.useCallback(async (item) => {
    await downloaFile({
      id: item.id,
      name: item.filename,
      url: `services/app/FileService/DownloadProofFile?id=${item.id}`,
    });
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
      width: 100,
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
      title: "Attachment",
      dataIndex: "categoryProof",
      key: "categoryProof",
      width: 200,
      render: (item, record) => {
        return (
          <>
            <Button
              style={{
                whiteSpace: "normal",
              }}
              onClick={() => onHandleDownloadCategoryProofFile(item)}
              type="link"
            >
              {item?.filename}
            </Button>
          </>
        );
      },
    },
    {
      title: "IsActive",
      dataIndex: "isActive",
      key: "isActive",
      width: 50,
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
      width: 60,
      render: (productId, record) => {
        return (
          <span>
            <Space>
              <Dropdown
                menu={{
                  // items: getActionItems(items, userRole),
                  items: getMenuActionItems(ACTION_ITEMS, userRole),
                  onClick: (e) => {
                    // eslint-disable-next-line default-case
                    switch (e.key) {
                      case USER_LIST_ACTION.ACTIVATE:
                        onHandleActivate(record);
                        break;
                      case USER_LIST_ACTION.MORE_DETAILS:
                        console.log(record);
                        setModalInfoOpen({
                          open: true,
                          record: record,
                        });
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
          </span>
        );
      },
    },
  ];
  return (
    <React.Fragment>
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
            <FixMyTaxTable
              columns={columns}
              size="small"
              dataSource={requestList}
            />
          </Col>
        </Row>
      </Card>
      <UpdateUser
        modalInfo={modalInfoOpen}
        onClose={() =>
          setModalInfoOpen({
            open: false,
            record: {},
          })
        }
      ></UpdateUser>
    </React.Fragment>
  );
};

export default UserComponent;
