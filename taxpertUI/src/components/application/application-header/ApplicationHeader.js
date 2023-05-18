import { Col, Row } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import ApplicationMenu from "../application-menu/ApplicationMenu";
// import logo1 from "../../../assets/img/footer_logo2.png";
import logo1 from "../../../assets/img/logo_header.png";
// import logo1 from "../../../assets/img/new_updated_logo.PNG";
import "./ApplicationHeader.css";
import ApplicationUserMenu from "../application-user-menu/ApplicationUserMenu";
import { Header } from "antd/lib/layout/layout";

const displayName = "ApplicationHeader";

function ApplicationHeader() {
  return (
    <>
      <Row justify="center" className="application-header">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Header className="header-fixed">
            <Row>
              <Col xl={3} lg={3} md={3} sm={20} xs={20}>
                <img
                  src={logo1}
                  alt="text"
                  height={80}
                  width={160}
                  style={{ objectFit: "cover" }}
                />
              </Col>
              <Col xl={19} lg={19} md={19} sm={4} xs={4}>
                <ApplicationMenu />
              </Col>
              <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                <ApplicationUserMenu />
              </Col>
            </Row>
          </Header>
        </Col>
      </Row>
    </>
  );
}

ApplicationHeader.displayName = displayName;

export default ApplicationHeader;
