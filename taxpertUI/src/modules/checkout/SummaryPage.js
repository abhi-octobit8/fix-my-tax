import React from "react";
import { Button, Card, Col, Collapse, Descriptions, Row, Space } from "antd";
import { Header4 } from "../../common/Headers";
import { toFixed } from "../../shared/utils";
import { calculateTotalPayment } from "./CheckoutMethod";

const { Panel } = Collapse;

const SummaryPage = (props) => {
  const { orderDetails, userInfo } = props;
  return (
    <React.Fragment>
      <Card>
        <Header4>Summary</Header4>
        <Descriptions bordered>
          <Descriptions.Item label="Fees" span={3}>
            {toFixed(orderDetails?.price)}
          </Descriptions.Item>
          <Descriptions.Item label="Discount" span={3}>
            {calculateTotalPayment({ category: 1, price: orderDetails?.price })}
          </Descriptions.Item>
          <Descriptions.Item label="GST 18%" span={3}>
            Cloud Database
          </Descriptions.Item>
          <Descriptions.Item label="Total Amount" span={3}>
            Cloud Database
          </Descriptions.Item>
        </Descriptions>
        <div className="content-padding">
          <Button block type="primary">
            Payment
          </Button>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default SummaryPage;
