import React, { useState } from "react";
import { Button, Card, Col, Dropdown, Row, Space, Tag } from "antd";
import { MoreOutlined, PlusOutlined } from "@ant-design/icons";
import useRedirectPath from "../../../hooks/useRedirectPath";
import FixMyTaxTable from "../../../../common/Table/FixMyTaxTable";
import AssignTicket from "./AssignTicket";
import ListHeader from "../../../../common/ListHeader/ListHeader";
import { getAllTickets } from "../../../../services/ticket.service";
import { DATE_FORMATS, getLocalTime } from "../../../../shared/timeUtils";
import {
  getKeyFromObject,
  getMenuActionItems,
  getObjectFromList,
} from "../../../../shared/utils";
import { ServiceType } from "../../services/constant";
import useUserRole from "../../../hooks/useUserRole";
import { getActionItems, items, TICKET_LIST_ACTION } from "./constant";
import { USER_ROLE } from "../../../application/application-menu/constant";
import { TicketStatus } from "../../../../shared/constants";
import {
  FIX_MY_TAX_SERVICE_TYPES,
  PAYMENT_STATUS,
} from "../../../../shared/constant/TaxService";

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
      dataIndex: "fixMyTaxServiceType",
      key: "fixMyTaxServiceType",
      width: 100,
      render: (text, value) => {
        return (
          <span>{getObjectFromList(FIX_MY_TAX_SERVICE_TYPES, text)?.name}</span>
        );
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
      title: "Payment status",
      dataIndex: "paymentStaus",
      key: "paymentStaus",
      render: (text, value) => {
        console.log(text);
        return <span>{getObjectFromList(PAYMENT_STATUS, text)?.name}</span>;
      },
      width: 150,
    },
    {
      title: "Transaction Number",
      dataIndex: "transactionNumber",
      key: "transactionNumber",
      width: 150,
    },
    {
      title: "Total Amount",
      dataIndex: "price",
      key: "price",
      width: 100,
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
      condition: (params) => {
        const { userRole } = params;
        const allowedRoles = [USER_ROLE.ADMIN];
        const isAllowed = allowedRoles.includes(userRole);

        return isAllowed;
      },
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

  const displayColumns = React.useMemo(() => {
    const allowedColumns = columns.filter((column) => {
      let isAllowed = true;

      if (typeof column.condition === "function") {
        isAllowed = column.condition({
          userRole,
        });
      }

      return isAllowed;
    }, []);

    return allowedColumns;
  }, [userRole]);

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
              columns={displayColumns}
              dataSource={responseInfo.data}
              onRow={(record) => onRowClick(record)}
              loading={responseInfo.loading}
              rowKey={"id"}
            />
          </Col>
        </Row>
      </Card>
      <AssignTicket modelInfo={modelInfoOpen} onClose={OnHandleCancel} />
    </React.Fragment>
  );
};

export default TicketListRequest;
