import Sider from "antd/lib/layout/Sider";
import React from "react";
import { Link, Outlet } from "react-router-dom";

import "./AdminLayout.css";
import { Layout, Menu } from "antd";
import { MENU_ITEMS } from "./constant";
import { Content } from "antd/lib/layout/layout";
import { useSelector } from "react-redux";
import { getMenuItems } from "../../../application/application-menu/constant";

const displayName = "AdminLayout";

function AdminLayout(props) {
  const userData = useSelector((state) => state.authentication.user);
  const data = getMenuItems(MENU_ITEMS, userData);

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
          {data.map((child) => {
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

AdminLayout.displayName = displayName;

export default AdminLayout;
