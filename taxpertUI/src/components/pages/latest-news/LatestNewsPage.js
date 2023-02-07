import { Button, Card, Col, Row } from "antd";
import React from "react";
import "./LatestNewsPage.css";
import { Collapse, Space } from "antd";
import { Link } from "react-router-dom";
import {
  ITAT_JUDEMENT_FILE_PATH,
  SUPREME_COURT_JUDEMENT_FILE_PATH,
  HIGH_COURT_JUDEMENT_FILE_PATH,
  CIRCULARS_NOTIFICATION_PATH,
} from "./constant";
const { Panel } = Collapse;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const LatestNewsPage = () => {
  return (
    <React.Fragment>
      {/* <section id="service-banner" className="service-banner">
        <div className="container" data-aos="fade-up">
          <div className="row justify-content-center">
            <div className="service-banner-info">
              <div className="service-banner-title">Latest News</div>
              An income tax notice is a written communication sent by the Income
              Tax Department to a taxpayer alerting an issue with his tax
              account. The notice can be sent for different reasons like filing/
              non-filing his/ her income tax return, for the purpose of making
              the assessment or to ask the certain details etc. When a notice is
              sent by the Income Tax Department, the taxpayer has to act on the
              notice and get the matter resolved with the tax authorities.
            </div>
          </div>
        </div>
      </section> */}

      <section className="section-container">
        <div className="section-header">
          <h4>Latest News</h4>
          <hr className="taxpert-line" />
        </div>
        <div>
          <Card>
            <Space direction="vertical" className="section-faq-items">
              <Collapse
                defaultActiveKey={["1"]}
                expandIconPosition={"end"}
                className="section-faq-item"
              >
                <Panel header="ITAT JUDGEMENT" key="1">
                  <ul>
                    {ITAT_JUDEMENT_FILE_PATH.map((item, index) => {
                      return (
                        <li key={index}>
                          <Link to={item.path} target="_blank" download>
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </Panel>
              </Collapse>
              <Collapse
                defaultActiveKey={["1"]}
                expandIconPosition={"end"}
                className="section-faq-item"
              >
                <Panel header="HIGH COURT JUDGEMENT" key="1">
                  <ul>
                    {HIGH_COURT_JUDEMENT_FILE_PATH.map((item, index) => {
                      return (
                        <li key={index}>
                          <Link to={item.path} target="_blank" download>
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </Panel>
              </Collapse>
              <Collapse
                defaultActiveKey={["1"]}
                expandIconPosition={"end"}
                className="section-faq-item"
              >
                <Panel header="SUPREME COURT JUDGEMENT" key="1">
                  <ul>
                    {SUPREME_COURT_JUDEMENT_FILE_PATH.map((item, index) => {
                      return (
                        <li key={index}>
                          <Link to={item.path} target="_blank" download>
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </Panel>
              </Collapse>
              <Collapse
                defaultActiveKey={["1"]}
                expandIconPosition={"end"}
                className="section-faq-item"
              >
                <Panel header="CIRCULAR NOTIFICATION" key="1">
                  <ul>
                    {CIRCULARS_NOTIFICATION_PATH.map((item, index) => {
                      return (
                        <li key={index}>
                          <Link to={item.path} target="_blank" download>
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </Panel>
              </Collapse>
            </Space>
          </Card>
        </div>
      </section>
    </React.Fragment>
  );
};

export default LatestNewsPage;
