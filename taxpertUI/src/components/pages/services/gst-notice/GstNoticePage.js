import React from "react";

import { Card, Col, Form, Row, Select } from "antd";
import { Collapse, Space } from "antd";
import { FIELD_NAME } from "./constant";
import { fixMytaxServicesInfo, FixMyTaxServiceType } from "../constant";
import { useState } from "react";
import { message } from "../../../../shared/utils";
import { registerNotice } from "../../../../services/register.service";
import GstNoticeFormContainer from "../../../../modules/gst-notice-form/GstNoticeFormContainer";
import { SUCCESS_MESSAGE_INFO } from "../../../../shared/constant/MessageInfo";

import "./GstNoticePage.css";

const { Panel } = Collapse;
const { Option } = Select;

const GstNoticePage = () => {
  const { gst } = fixMytaxServicesInfo;
  const [isLoading, setIsLoading] = useState(false);
  const titleHeader = "GST Notice";
  const [form] = Form.useForm();

  const [optionData, setOptionData] = useState({
    sectionList: [],
    subSectionsList: [],
  });

  React.useEffect(() => {
    setOptionData((prevState) => ({
      ...prevState,
      sectionList: Object.keys(gst),
    }));
  }, []);

  // const onFinish = async (values) => {
  //   console.log("registration values:", values);
  //   setIsLoading(true);
  //   try {
  //     const registerFormData = {
  //       name: values.name,
  //       email: values.email,
  //       phoneNumber: values.phoneNumber,
  //       ticketDetails: {
  //         fixMyTaxServiceType: FixMyTaxServiceType.GST_Notice,
  //         serviceType: 2, // notice reply always for time being
  //         section: values.section,
  //         subSection: "",
  //         subject: values.subject,
  //         question: values.question,
  //         description: values.description,
  //         // status: 0,
  //         price: values.price,
  //         // paymentStaus: 0,
  //         // transactionNumber: "678678",
  //       },
  //     };
  //     console.log(registerFormData);

  //     const res = await registerNotice(
  //       registerFormData,
  //       values.uploadGSTNotice
  //     );

  //     if (res.id) {
  //       message.success(SUCCESS_MESSAGE_INFO.REGISTRATION);
  //     }
  //   } catch (e) {
  //     console.error("error in creation", e);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const onHandleSection = (value) => {
    console.log(value);
    if (value) {
      const priceValue = gst[value].price;
      // setOptionData((prevState) => ({
      //   ...prevState,
      // }));
      form.setFieldValue(FIELD_NAME.PRICE, priceValue);
    } else {
      setOptionData((prevState) => ({
        sectionList: [],
      }));
      form.setFieldValue(FIELD_NAME.PRICE, "");
    }
  };

  return (
    <>
      <section id="service-banner-tds" className="section-banner">
        <div className="container" data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="section-banner-info">
              <div className="section-banner-title">GST Notices</div>
              <p className="section-banner-data">
                We understand that receiving a GST notice can be stressful and
                time-consuming, which is why we offer our expertise to handle
                them for you. Our team of experienced tax professionals will
                review and analyze the notice, ensuring that all necessary
                actions are taken to resolve the issue promptly. With our
                in-depth knowledge of GST laws and regulations, we aim to
                provide our clients with hassle-free GST notice handling
                services. Trust us to handle your GST notices with the utmost
                professionalism and expertise, ensuring your compliance with GST
                regulations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <Card className="content-max-margin" bordered={true}>
          <div className="section-header">
            <h2>{titleHeader}</h2>
          </div>
          <GstNoticeFormContainer
            selectedFixMyTaxService={FixMyTaxServiceType.GST_Notice}
          />
        </Card>
      </section>
      <div className="gst-site-card-wrapper">
        <div className="section-header">
          <h1>Different Types of GST Notice</h1>
          <hr className="taxpert-line" />
          <h6>
            Notices under GST are issue to the taxpayers, depending upon the
            purpose or gravity of default or action require from these
            taxpayers.
          </h6>
        </div>

        <Row gutter={16}>
          <Col span={8}>
            <Card
              id="cards"
              className="gst-notice-card"
              title="GSTR-3A"
              bordered={false}
            >
              <p>
                GSTR-3A notification for non-GST Returns files. This is the most
                common notification of all notifications. Applies to GSTR-1,
                GSTR-3B, GSTR-4, GSTR-8 (only for eCommerce Operators) Prepare &
                EFile for GST refunds payable and late payments, interest on GST
                obligation, if there is. for each notice or within 15 days from
                the date of the notice. (Note that this can be up to 7 days and
                in some cases.)
              </p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              id="cards"
              className="gst-notice-card"
              title="REG-03"
              bordered={false}
            >
              <p>
                REG-03 specification displayed to display or upload additional
                documents to complete new GST registrations, or amendments to
                GST registrations (key field updates, etc.) Provide
                clarification of the REG-04 notification by specifying or
                inserting additional details/documents requested 7 days of the
                notification date.
              </p>
            </Card>
          </Col>
          <Col span={8}>
            <Card
              id="cards"
              className="gst-notice-card"
              title="CMP-05"
              bordered={false}
            >
              <p>
                It is an SCN which questions the taxpayer’s ability to be a
                composition dealer under the GST norms. Indicate the reason for
                the notice to question the taxpayer’s suitability as a
                designated seller. Verify and the reasons why the taxpayer is
                still eligible for the design structure in their field and the
                amount they hold on each notice or within 15 days
              </p>
            </Card>
          </Col>
        </Row>
      </div>

      <section className="section-faq-container">
        <div className="section-header">
          <h4>FAQ’s on GST Notice</h4>
          <hr className="taxpert-line" />
        </div>
        <div>
          <Card>
            <Space direction="vertical" className="section-faq-items">
              <Collapse expandIconPosition={"end"} className="section-faq-item">
                <Panel
                  header="Can I authorize my Chartered Accountant to reply to GST Notices on my behalf?"
                  key="1"
                >
                  <p>
                    Yes, a Chartered Accountant or any other representative can
                    be authorized by the taxpayer for compliance of n GST
                    notices on his/her behalf.
                  </p>
                </Panel>
              </Collapse>
              <Collapse expandIconPosition={"end"}>
                <Panel header="How can I reply to GST Notices?" key="1">
                  <p>
                    The reply to GST Notices can be made by submitting response
                    online on GST Portal. In addition, while doing so, taxpayers
                    may use their own respective digital signature to
                    substantiate their title/ownership.
                  </p>
                </Panel>
              </Collapse>
              <Collapse expandIconPosition={"end"}>
                <Panel header="Do I need to upload any documents?" key="1">
                  <p>
                    Yes; the assessee has to upload doucment and information as
                    desired by the GST authorities to prove his/her bonafide.
                    you can avail the services of our experts to fixmytax before
                    uploading any document to make his/her reply more precise
                    and intense.
                  </p>
                </Panel>
              </Collapse>
            </Space>
          </Card>
        </div>
      </section>
    </>
  );
};
export default GstNoticePage;
