import { Button, Menu } from "antd";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { doLogout } from "../../../store/authentication/AuthActions";
import ApplicationMenu from "../application-menu/ApplicationMenu";
import logo1  from "../../../assets/img/logo2.png";

import "./ApplicationHeader.css";

const displayName = "ApplicationHeader";

function ApplicationHeader() {
  const navigate = useNavigate();
  const handleLogout = () => {
    doLogout();
  };
    
  return (
    <header className="application-header">
      <div className="application-header-logo-wrap ">
        <img src={logo1} alt="text" height={64} width={100}/>
      </div>
      
      <ApplicationMenu />

      {/* <ApplicationUserMenu /> */}
    </header>
  );
}

ApplicationHeader.displayName = displayName;

export default ApplicationHeader;
