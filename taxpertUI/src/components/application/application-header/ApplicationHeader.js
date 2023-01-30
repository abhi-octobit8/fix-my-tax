import { Button, Col, Menu, Row } from "antd";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import { doLogout } from "../../../store/authentication/AuthActions";
import ApplicationMenu from "../application-menu/ApplicationMenu";
import logo1 from "../../../assets/img/new_logo.JPG";
import { MenuOutlined } from "@ant-design/icons";
import "./ApplicationHeader.css";
import ApplicationUserMenu from "../application-user-menu/ApplicationUserMenu";
import { Content, Header } from "antd/lib/layout/layout";
import Title from "antd/lib/typography/Title";

const displayName = "ApplicationHeader";

function ApplicationHeader() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // doLogout();
  };
  const gotoPage = (page) => {
    //GO TO MENU ITEM PAGE
  };
  return (
    <>
      <Row justify="center" className="application-header">
        <Col xl={24} lg={24} md={24} sm={24} xs={24}>
          <Header className="header-fixed">
            <Row>
              <Col xl={3} lg={3} md={3} sm={20} xs={20}>
                <img src={logo1} alt="text" height={80} width={100} />
              </Col>
              <Col xl={21} lg={21} md={21} sm={4} xs={4}>
                <ApplicationMenu />
              </Col>
              {/* <Col xl={2} lg={2} md={2} sm={2} xs={2}>
                <ApplicationUserMenu />
              </Col> */}
            </Row>
          </Header>
        </Col>
      </Row>
    </>
  );
}

ApplicationHeader.displayName = displayName;

export default ApplicationHeader;
