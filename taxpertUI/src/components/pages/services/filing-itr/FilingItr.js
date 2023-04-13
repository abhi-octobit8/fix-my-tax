import React from "react";
import "./FilingItr.css";
import { Form, Select, Collapse, Space, Card } from "antd";
import { FIELD_NAME } from "./constant";
import { useState } from "react";
import { fixMytaxServicesInfo, FixMyTaxServiceType } from "../constant";
import { registerNotice } from "../../../../services/register.service";
import { message } from "../../../../shared/utils";
import FilingItrFormContainer from "../../../../common/filing-itr-form/FilingItrFormContainer";
import { SUCCESS_MESSAGE_INFO } from "../../../../shared/constant/MessageInfo";
const { Panel } = Collapse;
const { Option } = Select;

const FilingItr = () => {
  const { filing } = fixMytaxServicesInfo;
  const titleHeader = "Filing ITR/TCS/TDS";

  return (
    <React.Fragment>
      <section id="service-banner" className="service-banner">
        <div className="container" data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="service-banner-info">
              <div className="service-banner-title">Filing ITR TCS TDS</div>
              All matters related to direct/indirect tax filing, TDS/TCS filing
              and claim, enetrprise setup, consultancy on tax management for
              individuals and businesses. Other taxation related queries doubts.
            </div>
          </div>
        </div>
      </section>
      <section className="section-filing-card">
        <Card className="card-container" bordered={true}>
          <div className="Card-header-title">
            <h1>{titleHeader}</h1>
          </div>
          <FilingItrFormContainer
            selectedFixMyTaxService={FixMyTaxServiceType.ITR_TDS_TCS_Filing}
          />
        </Card>
      </section>
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
      </section>
    </React.Fragment>
  );
};

export default FilingItr;
