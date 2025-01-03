import React, { useState } from "react";
import { Button, Card, Descriptions } from "antd";
import { Header4 } from "../../common/Headers";
import { message, toFixed } from "../../shared/utils";
import { doLogout } from "../../store/authentication/AuthActions";
import { useNavigate } from "react-router-dom";
import { PATH } from "../../shared/Route";
import useUserRole from "../../components/hooks/useUserRole";
import { USER_ROLE } from "../../components/application/application-menu/constant";
import PaymentConfirmation from "./PaymentConfirmation";

const SummaryPage = (props) => {
  const navigate = useNavigate();
  const userRole = useUserRole();
  const [isPaymentConfirmationOpen, setIsPaymentConfirmationOpen] =
    useState(false);
  const { orderDetails, userInfo, onSubmit, priceInfo, isLoading } = props;

  const OnPayment = async () => {
    try {
      if (toFixed(priceInfo?.price)) {
        setIsPaymentConfirmationOpen(true);
      } else {
        message.error("Please select service request again");
      }
    } catch (e) {
    } finally {
      // setIsLoading(false);
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
            label={`Discount (${priceInfo?.discountRate} %)`}
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
            <Button type="primary" block onClick={onSubmit} loading={isLoading}>
              Payment
            </Button>
          ) : (
            <Button
              loading={isLoading}
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
      <PaymentConfirmation
        open={isPaymentConfirmationOpen}
        onSubmit={onSubmit}
        priceInfo={priceInfo}
      />
    </React.Fragment>
  );
};

export default SummaryPage;
