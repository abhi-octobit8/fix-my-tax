import Sider from "antd/lib/layout/Sider";
import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";

import "./AccountLayout.css";
import { Layout, Menu } from "antd";
import { MENU_ITEMS } from "./constant";
import { Content } from "antd/lib/layout/layout";

const displayName = "ExplorerLayout";

function AccountLayout(props) {
  const { children } = props;

  return (
    // <article className="account-layout">
    <Layout className="account-layout">
      {/* <div className="explorer-layout-menu">
        <div className="explorer-layout-menu-content"> */}
      <Sider
        width={200}
        // style={{
        //   background: blue,
        // }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={["test"]}
          //   defaultOpenKeys={["sub1"]}
          style={{
            height: "100%",
            borderRight: 1,
          }}
        >
          {MENU_ITEMS.map((child) => {
            return (
              <Menu.Item key={child.to}>
                <Link to={child.to}>{child.label}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </Sider>
      {/* </div>
      </div> */}

      {/* <section className="explorer-layout-content">{children}</section> */}
      {/* <section className="explorer-layout-content">
        <Outlet />
      </section> */}
      <Content className="explorer-layout-content">
        <Outlet />
      </Content>
      {/* </article> */}
    </Layout>
  );
}

AccountLayout.displayName = displayName;

export default AccountLayout;
