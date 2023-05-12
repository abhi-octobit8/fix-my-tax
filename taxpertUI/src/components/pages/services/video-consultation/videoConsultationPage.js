import React from "react";

import { Collapse, Space, Card } from "antd";
import { FixMyTaxServiceType } from "../constant";

import VideoConsultationFormContainer from "../../../../modules/video-consultation/VideoConsultationFormContainer";

const { Panel } = Collapse;

const VideoConsultationPage = () => {
  const titleHeader = "Video Consultation";

  return (
    <React.Fragment>
      <section id="service-banner--consultation" className="section-banner">
        <div className="container" data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="section-banner-info">
              <div className="section-banner-title">{titleHeader}</div>
              <p className="section-banner-data">
                Introducing our innovative video consultation service for all
                matters related to taxation and enterprise setup – the first of
                its kind in the industry, provided by our tax consultancy firm.
                With this service, we provide our clients with a virtual
                consultation experience that is flexible, efficient, and
                convenient. Our team of experienced tax professionals will
                address all your queries and concerns, including tax planning,
                compliance, and enterprise setup. With our advanced technology
                and expertise, we aim to provide our clients with a seamless
                video consultation experience that delivers personalized
                solutions tailored to their unique needs. Trust us to provide
                you with a modern and innovative approach to tax and enterprise
                consultation services.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Card bordered={true} className="content-max-margin">
          <div className="section-header">
            <h2>{titleHeader}</h2>
          </div>
          <VideoConsultationFormContainer
            selectedFixMyTaxService={FixMyTaxServiceType.ITR_TDS_TCS_Filing}
          />
        </Card>
      </section>
      {/* <section className="section-faq-container">
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
                    If you get an income tax notice, you should understand why
                    the notice has been sent. Notices may be sent due to various
                    reasons. For example, Notices may be sent for the details
                    and papers required by the Income Tax Department. In such a
                    case, you need to provide the details as required. If there
                    is any error in the ITR, then notices may be sent to rectify
                    the error. In such a case, you should then rectify any error
                    in your return and respond to the notice with the time
                    specified by the income tax department to avoid possible
                    penalties.
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
                    different types of consequences depending upon the type of
                    Notice which you would have to face. Such consequences
                    include fines of up to INR 10,000 and also imprisonment for
                    up to a year.
                  </p>
                </Panel>
              </Collapse>
              <Collapse expandIconPosition={"end"}>
                <Panel
                  header="What happens if I dont respond to the notice within 30 days?"
                  key="1"
                >
                  <p>
                    In case you dont respond to notice within 30 days the income
                    tax department will make the adjustment if there is some
                    outstanding demand without giving any further opportunity to
                    respond.
                  </p>
                </Panel>
              </Collapse>
            </Space>
          </Card>
        </div>
      </section> */}
    </React.Fragment>
  );
};

export default VideoConsultationPage;
