import { Button, Card, Col, Row } from "antd";
import React from "react";
import "./ItrNotice.css";
import { Collapse, Space } from "antd";
import NoticeFormPage from "../notice-form/NoticeFormPage";
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const ItrNoticeService = () => (
  <React.Fragment>
    <section id="service-banner" className="service-banner">
      <div className="container" data-aos="fade-up">
        <div className="row justify-content-center">
          <div className="service-banner-info">
            <div className="service-banner-title">
              Income Tax Notices in India
            </div>
            An income tax notice is a written communication sent by the Income
            Tax Department to a taxpayer alerting an issue with his tax account.
            The notice can be sent for different reasons like filing/ non-filing
            his/ her income tax return, for the purpose of making the assessment
            or to ask the certain details etc. When a notice is sent by the
            Income Tax Department, the taxpayer has to act on the notice and get
            the matter resolved with the tax authorities.
          </div>
        </div>
      </div>
    </section>
    {/* <div className="site-card-wrapper">
      <div className="section-header">
        <h1>Different Types of ITR Notice</h1>
        <hr className="taxpert-line" />
        <h6>
          The income tax department sends different types of notices to
          taxpayers depending on the cause of the notice
        </h6>
      </div>
      <Row gutter={16}>
        <Col span={8}>
          <Card
            className="notice-card"
            title="Notice send Under section 139"
            bordered={false}
          >
            If the AO believes that a defective income tax return is filed, he
            would serve you notice under this section. The error can be missing
            information, use of the wrong ITR form, incomplete return, etc. The
            officer would also highlight the defect in the income tax return and
            recommend the solution thereof. You get a period of 15 days to
            respond to the notice. If you do not respond, your ITR would be
            rejected.
          </Card>
        </Col>
        <Col span={8}>
          <Card
            className="notice-card"
            title=" Notice under Section 142(1) "
            bordered={false}
          >
            A notice is served by the assessing officer u/s 142 (1) in two
            cases. Firstly, if the officer requires additional information and
            documents pertaining to your income tax returns. Secondly, if the
            return has not been filed but the officer wants the return to be
            filed. If you do not respond to the notice served under Section
            142(1), you would face a penalty of INR 10,000, prosecution for up
            to 1 year or both.
          </Card>
        </Col>
        <Col span={8}>
          <Card
            className="notice-card"
            title="Notice under Section 148"
            bordered={false}
          >
            This notice is sent in cases where the assessing officer(AO) has a
            reason to believe that a taxpayer has filed his ITR on a lower
            income or not filed when he was mandated by the law. The time limit
            to send the notice under this section depends on the amount and
            nature of income escaped.
          </Card>
        </Col>
      </Row>
    </div> */}
    <NoticeFormPage titleHeader="ITR Notice" />
    <section className="section-container">
      <div className="section-header">
        <h4>FAQ’s on Income Tax Notice</h4>
        <hr className="taxpert-line" />
      </div>
      <div>
        <Card>
          <Space direction="vertical" className="section-faq-items">
            <Collapse expandIconPosition={"end"} className="section-faq-item">
              <Panel header="What to do if I get a tax notice?" key="1">
                <p>
                  Notices may be served enquiring any missing informaiton or
                  supporting document required to substantiate your return or
                  for any other reason realting to income
                  escaping/non-disclosure of income. As suc you are required to
                  furnish necessary details and documents ot substantiate your
                  return or justify your income; so that you may avoid peral and
                  prosecution proceedings.
                </p>
              </Panel>
            </Collapse>
            <Collapse expandIconPosition={"end"}>
              <Panel
                header="What happens if you dont respond to tax notice?"
                key="1"
              >
                <p>
                  If you dont respond to the income tax notice, there can be
                  different types of consequential proceeding depending upon the
                  type of Notice which has been served.Such consequences include
                  fines of up to INR 10,000 and also imprisonment.
                </p>
              </Panel>
            </Collapse>
            <Collapse expandIconPosition={"end"}>
              <Panel
                header="What happens if I dont respond to the notice within the time prescribed?"
                key="1"
              >
                <p>
                  In case you dont respond to notice within the time prescribed;
                  the Income Tax Department will make the adjustment of refund
                  to some outstanding demand without giving any further
                  opportunity to respond or initiate/impose penalty as per
                  provisons of the Income Tax Act.
                </p>
              </Panel>
            </Collapse>
          </Space>
        </Card>
      </div>
    </section>
  </React.Fragment>
);

export default ItrNoticeService;
