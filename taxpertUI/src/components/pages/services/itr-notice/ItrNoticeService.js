import { Button } from "antd";
import React from "react";
import "./ItrNotice.css";

const ItrNoticeService = () => (
  <React.Fragment>
    <section id="service-banner" className="service-banner">
      <div className="container" data-aos="fade-up">
        <div className="row justify-content-center">
          {/* <div className="col-lg-6 text-center">
            <h3> Income Tax Notices in India</h3>

            <Button type="primary" size="large" className="cta-btn">
              Start Here
            </Button>
          </div> */}
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
  </React.Fragment>
);

export default ItrNoticeService;
