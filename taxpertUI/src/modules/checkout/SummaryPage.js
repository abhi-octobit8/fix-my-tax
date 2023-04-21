import React, { useState } from "react";
import { Button, Card, Col, Collapse, Descriptions, Row, Space } from "antd";
import { Header4 } from "../../common/Headers";
import { toFixed } from "../../shared/utils";
import { calculateTotalPayment } from "./CheckoutMethod";
import { doLogout } from "../../store/authentication/AuthActions";
import { Navigate, useNavigate } from "react-router-dom";
import { PATH } from "../../shared/Route";
import useUserRole from "../../components/hooks/useUserRole";
import { USER_ROLE } from "../../components/application/application-menu/constant";

const { Panel } = Collapse;

const SummaryPage = (props) => {
  const navigate = useNavigate();
  const userRole = useUserRole();
  const [isLoading, setIsLoading] = useState(false);
  const { orderDetails, userInfo, onSubmit, priceInfo } = props;

  const OnPayment = async () => {
    try {
      setIsLoading(true);
      await onSubmit();
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <React.Fragment>
      <Card>
        <Header4>Summary</Header4>
        <Descriptions bordered>
          <Descriptions.Item label="Fees" span={3}>
            {toFixed(priceInfo?.price)}
          </Descriptions.Item>
          <Descriptions.Item
            label={`Discount (${priceInfo.discountRate} %)`}
            span={3}
          >
            {toFixed(priceInfo?.discountAmount)}
          </Descriptions.Item>
          <Descriptions.Item label="GST 18%" span={3}>
            {toFixed(priceInfo?.taxAmount)}
          </Descriptions.Item>
          <Descriptions.Item label="Total Amount" span={3}>
            {toFixed(priceInfo?.totalAmount)}
          </Descriptions.Item>
        </Descriptions>
        <div className="content-padding">
          {userRole === USER_ROLE.CUSTOMER ? (
            <Button type="primary" block onClick={OnPayment}>
              Payment
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => {
                doLogout();
                navigate(PATH.SERVICE_ITR_FILING);
              }}
              block
            >
              Got to Services
            </Button>
          )}
        </div>
      </Card>
    </React.Fragment>
  );
};

export default SummaryPage;
