import React from "react";
import { Card, Descriptions } from "antd";
import { Header4 } from "../../common/Headers";

const ServiceDetails = (props) => {
  const { userInfo, orderDetails } = props;
  return (
    <React.Fragment>
      <Card>
        <Header4>Assessee Details</Header4>
        <Descriptions>
          <Descriptions.Item label="Name" span={2}>
            {" "}
            {userInfo?.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Pan Number" span={1}>
            {" "}
            ABCD1239D
          </Descriptions.Item>
          <Descriptions.Item label="Category" span={3}>
            1
          </Descriptions.Item>
        </Descriptions>
        <Header4>Service Details</Header4>
        <Descriptions>
          <Descriptions.Item label="Service Name" span={3}>
            {" "}
            {orderDetails?.fixMyTaxService?.name}
          </Descriptions.Item>
          <Descriptions.Item label="Selected Section" span={3}>
            {orderDetails?.sectionValue}
          </Descriptions.Item>
          <Descriptions.Item label="Selected Sub Section" span={3}>
            {orderDetails?.subSectionValue}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </React.Fragment>
  );
};

export default ServiceDetails;
