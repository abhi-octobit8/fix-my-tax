import React, { useState } from "react";
import { Card, Col, Dropdown, Row, Space, Tag } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import useRedirectPath from "../../../hooks/useRedirectPath";
import FixMyTaxTable from "../../../../common/Table/FixMyTaxTable";
import AssignTicket from "./AssignTicket";
import ListHeader from "../../../../common/ListHeader/ListHeader";
import { getAllTickets } from "../../../../services/ticket.service";
import { DATE_FORMATS, getLocalTime } from "../../../../shared/timeUtils";
import { getKeyFromObject } from "../../../../shared/utils";
import { ServiceType } from "../../services/constant";
import useUserRole from "../../../hooks/useUserRole";
import { getActionItems, items, TICKET_LIST_ACTION } from "./constant";

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
    })();
  }, []);

  const onHandleAssignTicket = React.useCallback((record) => {
    setModelInfoOpen({ open: true, record });
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
      width: 150,
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
      render: (value) => value.map((item) => item.filename).join(),
    },
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
                  items: getActionItems(items, userRole),
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
        <ListHeader leftContent={<h2>All Request </h2>}></ListHeader>
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
