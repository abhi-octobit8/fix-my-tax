import React from "react";
import { Card, Col, Collapse, Descriptions, Row, Space } from "antd";
import ServiceDetails from "./ServiceDetails";
import SummaryPage from "./SummaryPage";
import { Header2 } from "../../common/Headers";
import useUserData from "../../components/hooks/useUserData";
import { useSelector } from "react-redux";
import { SUCCESS_MESSAGE_INFO } from "../../shared/constant/MessageInfo";
import { PATH } from "../../shared/Route";
import { message } from "../../shared/utils";

const { Panel } = Collapse;

const CheckoutPage = (props) => {
  const titleHeader = "Checkout";
  const userInfo = useUserData();
  const orderDetails = useSelector((state) => state.order.orderInfo);

  const onSubmit = async () => {
    // check request created from new assessee or existing assessee
    console.log("userInfo", userInfo);
    console.log("orderDetails", orderDetails);
    console.log();
    debugger;
    // if (userRole) {
    // const registerFormData = {
    //   fixMyTaxServiceType: values.fixMyTaxService,
    //   serviceType: 2, // notice reply always for time being
    //   section: values.section,
    //   subSection: values.subSection,
    //   subject: values.subject,
    //   question: values.question,
    //   description: values.description,
    //   // status: 0,
    //   price: values.price,
    //   // paymentStaus: 0,
    //   // transactionNumber: "678678",
    // };
    // console.log("registerFormData", registerFormData, values);
    // const res = await createTicketService(registerFormData, values.uploadITR);
    // if (res.id) {
    //   message.success(SUCCESS_MESSAGE_INFO.REGISTRATION);
    //   navigate(PATH.TICKET_REQUEST_LIST);
    // }
    // }
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
              <ServiceDetails userInfo={userInfo} orderDetails={orderDetails} />
            </Col>
            <Col xs={24} xl={8}>
              <SummaryPage
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
