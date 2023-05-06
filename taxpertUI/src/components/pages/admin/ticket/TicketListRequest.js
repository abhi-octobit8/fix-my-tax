import React, { useState } from "react";
import { Button, Card, Col, Dropdown, Row, Space, Tag } from "antd";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import useRedirectPath from "../../../hooks/useRedirectPath";
import FixMyTaxTable from "../../../../common/Table/FixMyTaxTable";
import AssignTicket from "./AssignTicket";
import ListHeader from "../../../../common/ListHeader/ListHeader";
import { getAllTickets } from "../../../../services/ticket.service";
import { DATE_FORMATS, getLocalTime } from "../../../../shared/timeUtils";
import { getKeyFromObject, getMenuActionItems } from "../../../../shared/utils";
import { ServiceType } from "../../services/constant";
import useUserRole from "../../../hooks/useUserRole";
import { getActionItems, items, TICKET_LIST_ACTION } from "./constant";
import { USER_ROLE } from "../../../application/application-menu/constant";
import { TicketStatus } from "../../../../shared/constants";

const TicketListRequest = () => {
  const navigator = useRedirectPath();
  const userRole = useUserRole();

  const [responseInfo, setResponeInfo] = useState({ loading: false, data: [] });
  const [modelInfoOpen, setModelInfoOpen] = useState({
    open: false,
    record: {},
  });

  React.useEffect(() => {
    (async () => {
      try {
        setResponeInfo((prevState) => ({
          ...prevState,
          loading: true,
        }));
        const res = await getAllTickets();
        setResponeInfo((prevState) => ({
          ...prevState,
          data: res,
          loading: false,
        }));
      } catch (e) {
        console.error(e);
      } finally {
        setResponeInfo((prevState) => ({
          ...prevState,
          loading: false,
        }));
      }
    })();
  }, []);

  const onHandleAssignTicket = React.useCallback((record) => {
    setModelInfoOpen({ open: true, record });
  }, []);

  const onHandleCreate = React.useCallback(() => {
    navigator.goTo(`/admin/requests/create`);
  }, []);

  const OnHandleCancel = React.useCallback((formValues) => {
    setModelInfoOpen({ open: false, record: {} });
  }, []);

  const columns = [
    {
      title: "Request",
      dataIndex: "section",
      key: "section",
      width: 250,
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
      width: 100,
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
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (value) => {
        return (
          <>
            {value === true ? (
              <Tag color="#2db7f5">
                {" "}
                {getKeyFromObject(TicketStatus, value)}
              </Tag>
            ) : (
              <Tag color="#2db7f5">{getKeyFromObject(TicketStatus, value)}</Tag>
            )}
          </>
        );
      },
    },
    {
      title: "Assigned To",
      dataIndex: "assignedUserName",
      key: "assignedUserName",
      width: 150,
    },
    // {
    //   title: "Assigned By",
    //   dataIndex: "assignmentByUserName",
    //   key: "assignmentByUserName",
    //   width: 150,
    // },

    {
      title: "Actions",
      dataIndex: "id",
      fixed: "right",
      align: "center",
      width: 60,
      onCell: (record) => {
        return {
          onClick: (event) => {
            event.stopPropagation();
          },
        };
      },
      render: (productId, record) => {
        return (
          <span>
            <Space>
              <Dropdown
                menu={{
                  // items: getActionItems(items, userRole),
                  items: getMenuActionItems(items, userRole),
                  onClick: (e) => {
                    // eslint-disable-next-line default-case
                    switch (e.key) {
                      case TICKET_LIST_ACTION.ASSIGN:
                        onHandleAssignTicket(record);
                        break;
                      case TICKET_LIST_ACTION.DELETE:
                        console.log(record);
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
        <ListHeader
          leftContent={<h2>All Request </h2>}
          // rightContent={
          //   <>
          //     {userRole == USER_ROLE.CUSTOMER ? (
          //       <Button
          //         onClick={onHandleCreate}
          //         type="primary"
          //         shape="circle"
          //         icon={<PlusOutlined />}
          //       />
          //     ) : null}
          //   </>
          // }
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
            <FixMyTaxTable
              size="small"
              columns={columns}
              dataSource={responseInfo.data}
              onRow={(record) => onRowClick(record)}
              loading={responseInfo.loading}
            />
          </Col>
        </Row>
      </Card>
      <AssignTicket modelInfo={modelInfoOpen} onClose={OnHandleCancel} />
    </React.Fragment>
  );
};

export default TicketListRequest;
