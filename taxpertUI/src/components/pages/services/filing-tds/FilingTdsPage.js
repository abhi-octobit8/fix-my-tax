import React from "react";
import { Collapse, Space, Card } from "antd";
import { FixMyTaxServiceType } from "../constant";
import {} from "../../../../services/register.service";
import FilingTdsFormContainer from "../../../../modules/filing-tds/FilingTdsFormContainer";
import SeoHeader from "../../../../common/seo/SeoHeader";
import { TAGS } from "../../../../shared/constant/Tags";
import { NavLink } from "react-router-dom";
const { Panel } = Collapse;

const FilingTdsPage = () => {
  const titleHeader = "TDS/TCS Filing";

  return (
    <React.Fragment>
      <SeoHeader
        title={TAGS.tds_tcs_filling.title}
        description={TAGS.tds_tcs_filling.decription}
      />
      <section id="service-banner-tds" className="section-banner">
        <div className="container" data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="section-banner-info">
              <div className="section-banner-title">TDS/TCS Filing</div>
              <p className="section-banner-data">
                Introducing our reliable and efficient TDS/TCS filing service
                provided by our{" "}
                <NavLink to="/service/business-consultation">
                  {" "}
                  tax consultancy firm
                </NavLink>
                .<NavLink to="/"> Fix My Tax </NavLink> understand that
                complying with TDS/TCS regulations can be a daunting task, which
                is why we offer our expertise to simplify the process for you.
                Our team of experienced tax professionals will ensure that your
                TDS/TCS obligations are met in a timely and accurate manner,
                avoiding any potential penalties or interest charges. With our
                in-depth knowledge of TDS/TCS laws and regulations, we aim to
                provide our clients with hassle-free TDS/TCS filings. Trust us
                to handle your TDS/TCS filings with the utmost professionalism
                and expertise.
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
          <FilingTdsFormContainer
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

export default FilingTdsPage;
