import { Button, Menu } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";
import { doLogout } from "../../../store/authentication/AuthActions";
// import ApplicationMenu from "~/component/application/application-menu";
// import Logo from "~/component/common/logo";

import "./ApplicationHeader.css";
import { MENU_ITEMS } from "./constant";

const displayName = "ApplicationHeader";

function ApplicationHeader() {
  const handleLogout = () => {
    doLogout();
  };
  return (
    <Menu theme="dark" mode="horizontal">
      {MENU_ITEMS.map((child) => {
        return (
          <Menu.Item key={child.to}>
            <NavLink to={child.to}>{child.label}</NavLink>
          </Menu.Item>
        );
      })}
      <Menu.Item key="login" style={{ marginLeft: "auto" }}>
        <NavLink to={"/login"}>Login</NavLink>
      </Menu.Item>
    </Menu>
  );
}

ApplicationHeader.displayName = displayName;

export default ApplicationHeader;
