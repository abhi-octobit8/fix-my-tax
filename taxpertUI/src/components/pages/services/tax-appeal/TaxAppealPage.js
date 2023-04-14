import React from "react";
import { Card, Collapse, Space } from "antd";
import { FixMyTaxServiceType } from "../constant";

import "./TaxAppealPage.css";
import TaxAppealFormContainer from "../../../../modules/tax-appeal/TaxAppealFormContainer";

const { Panel } = Collapse;

const TaxAppealPage = (props) => {
  const titleHeader = "Income Tax / GST Appeals";

  return (
    <React.Fragment>
      <section id="service-banner-itr-notice" className="section-banner">
        <div className="container" data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="section-banner-info">
              <div className="section-banner-title">
                Income Tax / GST Appeals
              </div>
              <p className="section-banner-data">
                We understand that receiving a notice of appeal can be a
                daunting task, which is why we offer our expertise to handle
                them for you. Our team of experienced tax professionals will
                represent you before the appropriate authorities, ensuring that
                all necessary actions are taken to resolve the appeal in a
                timely and favorable manner. With our in-depth knowledge of
                income tax and GST laws and regulations, we aim to provide our
                clients with effective representation in appeals. Trust us to
                handle your income tax and GST appeals with the utmost
                professionalism and expertise.
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
          <TaxAppealFormContainer
            selectedFixMyTaxService={FixMyTaxServiceType.ITR_TDS_TCS_Notice}
          />
        </Card>
      </section>

      <section className="section-faq-container">
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
                    escaping/non-disclosure of income. As suc you are required
                    to furnish necessary details and documents ot substantiate
                    your return or justify your income; so that you may avoid
                    peral and prosecution proceedings.
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
                    different types of consequential proceeding depending upon
                    the type of Notice which has been served.Such consequences
                    include fines of up to INR 10,000 and also imprisonment.
                  </p>
                </Panel>
              </Collapse>
              <Collapse expandIconPosition={"end"}>
                <Panel
                  header="What happens if I dont respond to the notice within the time prescribed?"
                  key="1"
                >
                  <p>
                    In case you dont respond to notice within the time
                    prescribed; the Income Tax Department will make the
                    adjustment of refund to some outstanding demand without
                    giving any further opportunity to respond or initiate/impose
                    penalty as per provisons of the Income Tax Act.
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

export default TaxAppealPage;
