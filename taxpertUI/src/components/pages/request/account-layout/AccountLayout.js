import Sider from "antd/lib/layout/Sider";
import React from "react";
import { Link, Outlet } from "react-router-dom";

import "./AccountLayout.css";
import { Layout, Menu } from "antd";
import { MENU_ITEMS } from "./constant";
import { Content } from "antd/lib/layout/layout";

const displayName = "ExplorerLayout";

function AccountLayout(props) {
  const { children } = props;

  return (
    <Layout className="account-layout">
      <Sider width={200}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["test"]}
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

      <Content className="explorer-layout-content">
        <Outlet />
      </Content>
    </Layout>
  );
}

AccountLayout.displayName = displayName;

export default AccountLayout;
