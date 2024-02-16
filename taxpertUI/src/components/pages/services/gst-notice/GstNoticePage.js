import React from "react";

import { Card } from "antd";
import { Collapse, Space } from "antd";
import { FixMyTaxServiceType } from "../constant";
import GstNoticeFormContainer from "../../../../modules/gst-notice-form/GstNoticeFormContainer";
import { TAGS } from "../../../../shared/constant/Tags";
import SeoHeader from "../../../../common/seo/SeoHeader";

const { Panel } = Collapse;

const GstNoticePage = () => {
  const titleHeader = "GST Notice";

  return (
    <>
      <SeoHeader
        title={TAGS.gst_notice.title}
        description={TAGS.gst_notice.decription}
      />
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
