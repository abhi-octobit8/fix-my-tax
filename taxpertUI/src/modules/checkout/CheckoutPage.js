import React from "react";
import { Card, Col, Collapse, Descriptions, Row, Space } from "antd";
import ServiceDetails from "./ServiceDetails";
import SummaryPage from "./SummaryPage";
import { Header2 } from "../../common/Headers";
import useUserData from "../../components/hooks/useUserData";
import { useSelector } from "react-redux";

const { Panel } = Collapse;

const CheckoutPage = (props) => {
  const titleHeader = "Checkout";
  const userInfo = useUserData();
  const orderDetails = useSelector((state) => state.order.orderInfo);
  console.log(orderDetails);
  console.log("userinfo", userInfo);

  return (
    <React.Fragment>
      <section id="service-banner-itr-notice" className="section-banner">
        <div className="container" data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="section-banner-info">
              <div className="section-banner-title">Checkout</div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Card className="content-max-margin" bordered={true}>
          <div className="section-header">
            <Header2>{titleHeader}</Header2>
          </div>
          <Row gutter={20}>
            <Col xs={24} xl={16}>
              <ServiceDetails userInfo={userInfo} orderDetails={orderDetails} />
            </Col>
            <Col xs={24} xl={8}>
              <SummaryPage userInfo={userInfo} orderDetails={orderDetails} />
            </Col>
          </Row>
        </Card>
      </section>
    </React.Fragment>
  );
};

export default CheckoutPage;
