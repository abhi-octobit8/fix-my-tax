/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Card } from "antd";
import { Header3 } from "../../../../common/Headers";
import gstReturn from "../../../../assets/img/gst_return.png";
import { openFile } from "../../../../shared/utils";

import "./GstReturnPage.css";
import SeoHeader from "../../../../common/seo/SeoHeader";
import { TAGS } from "../../../../shared/constant/Tags";
import { NavLink } from "react-router-dom";

const GstReturnPage = () => {
  const titleHeader = "GST Return";

  return (
    <React.Fragment>
      <SeoHeader
        title={TAGS.gst_return.title}
        description={TAGS.gst_return.decription}
      />
      <section id="service-banner-tds" className="section-banner">
        <div className="container" data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="section-banner-info">
              <div className="section-banner-title">GST Return</div>
              <p className="section-banner-data">
                We understand the importance of timely and accurate GST filings,
                which is why we offer our expertise to individuals, businesses,
                and organizations of all sizes. Our team of experienced tax
                professionals will guide you through the entire process,
                ensuring that all your GST obligations are met while maximizing
                your tax savings. With our thorough understanding of GST laws
                and regulations, <NavLink to="/"> Fix My Tax </NavLink> strive
                to provide our clients with peace of mind during GST filing
                season. Trust us to handle your GST filings with efficiency and
                accuracy.
              </p>
              <div className="section-header">
                <Header3>
                  <a
                    href="#"
                    onClick={() => openFile("/documents/FORMS_UNDER_GST.pdf")}
                  >
                    Forms under GST Act
                  </a>
                </Header3>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <Card bordered={true} className="content-max-margin">
          <div className="section-header">
            <h2>{titleHeader}</h2>
          </div>
          {/* <Header1 className="section-header">Image come Here...</Header1> */}

          <div className="section-return-img">
            <img
              className="section-return-img-place"
              src={gstReturn}
              alt="text"
            />
          </div>
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

export default GstReturnPage;
