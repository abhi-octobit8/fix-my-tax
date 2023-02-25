import React from "react";
import { Link } from "react-router-dom";
import { Collapse, Space, Card } from "antd";
import {
  ITAT_JUDEMENT_FILE_PATH,
  SUPREME_COURT_JUDEMENT_FILE_PATH,
  HIGH_COURT_JUDEMENT_FILE_PATH,
  CIRCULARS_NOTIFICATION_PATH,
} from "./constant";
import "./LatestNewsPage.css";

const { Panel } = Collapse;

const LatestNewsPage = () => {
  return (
    <React.Fragment>
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
