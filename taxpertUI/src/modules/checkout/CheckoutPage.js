import React, { useState } from "react";
import { Card, Col, Collapse, Descriptions, Row, Space } from "antd";
import ServiceDetails from "./ServiceDetails";
import SummaryPage from "./SummaryPage";
import { Header2 } from "../../common/Headers";
import useUserData from "../../components/hooks/useUserData";
import { useSelector } from "react-redux";
import { SUCCESS_MESSAGE_INFO } from "../../shared/constant/MessageInfo";
import { PATH } from "../../shared/Route";
import { message } from "../../shared/utils";
import { createTicketService } from "../../services/ticket.service";
import { useNavigate } from "react-router-dom";
import { GetServiceTotalPrice } from "../../services/checkout.service";

const { Panel } = Collapse;

const CheckoutPage = (props) => {
  const navigate = useNavigate();
  const titleHeader = "Checkout";
  const userInfo = useUserData();
  const [priceInfo, setPriceInfo] = useState();

  const orderDetails = useSelector((state) => state.order.orderInfo);
  console.log(orderDetails);

  React.useEffect(() => {
    (async () => {
      if (orderDetails.pricingKey) {
        const res = await GetServiceTotalPrice(orderDetails.pricingKey);
        setPriceInfo(res);
      }
    })();
  }, [orderDetails]);

  const onSubmit = async () => {
    debugger;
    // check request created from new assessee or existing assessee

    const registerFormData = {
      fixMyTaxServiceType: orderDetails.fixMyTaxService.value,
      serviceType: orderDetails.fixMyTaxService.value === 8 ? 1 : 2, // notice reply or video consultation
      section: orderDetails.sectionObj.name,
      subSection: orderDetails?.subSectionObj
        ? orderDetails.subSectionObj.name
        : "",
      subject: "",
      question: "",
      description:
        orderDetails.fixMyTaxService.value === 8 ? orderDetails.query : "",
      // status: 0,
      price: orderDetails.price,
      slotId:
        orderDetails.fixMyTaxService.value === 8 ? orderDetails.slotId : 0,
      // slotId
      // paymentStaus: 0,
      // transactionNumber: "678678",
    };
    console.log("registerFormData", registerFormData);
    const res = await createTicketService(
      registerFormData,
      orderDetails.uploadDocument
    );
    if (res.id) {
      message.success(SUCCESS_MESSAGE_INFO.REGISTRATION);
      navigate(PATH.TICKET_REQUEST_LIST);
    }
  };

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
              <ServiceDetails
                priceInfo={priceInfo}
                userInfo={userInfo}
                orderDetails={orderDetails}
              />
            </Col>
            <Col xs={24} xl={8}>
              <SummaryPage
                priceInfo={priceInfo}
                userInfo={userInfo}
                orderDetails={orderDetails}
                onSubmit={onSubmit}
              />
            </Col>
          </Row>
        </Card>
      </section>
    </React.Fragment>
  );
};

export default CheckoutPage;