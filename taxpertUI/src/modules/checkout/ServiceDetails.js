import React from "react";
import { Card, Descriptions } from "antd";
import { Header4 } from "../../common/Headers";
import { getObjectFromList } from "../../shared/utils";
import { REGISTER_CATEGORIES } from "../../components/pages/register/constant";

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
            {userInfo?.panCardNumber}
          </Descriptions.Item>
          <Descriptions.Item label="Category" span={2}>
            {
              getObjectFromList(REGISTER_CATEGORIES, userInfo?.fmtCategory)
                ?.name
            }
          </Descriptions.Item>
          <Descriptions.Item label="Aadhar Number" span={1}>
            {" "}
            {userInfo?.adharNumber}
          </Descriptions.Item>
        </Descriptions>
        <Header4>Service Details</Header4>
        <Descriptions>
          <Descriptions.Item label="Service Name" span={3}>
            {" "}
            {orderDetails?.fixMyTaxService?.name}
          </Descriptions.Item>
          <Descriptions.Item label="" span={3}>
            {orderDetails?.sectionObj?.name}{" "}
            {orderDetails?.sectionObj?.description}
          </Descriptions.Item>
          <Descriptions.Item label="" span={3}>
            {orderDetails?.subSectionObj?.name}{" "}
            {orderDetails?.subSectionObj?.description}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </React.Fragment>
  );
};

export default ServiceDetails;
