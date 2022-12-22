import React from "react";
import Dropdown from "antd/es/dropdown";
import { MENU_ITEMS, MENU_KEY } from "./constant";

import "./ApplicationUserMenu.css";
import { Menu } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { doLogout } from "../../../store/authentication/AuthActions";

const displayName = "ApplicationUserMenu";

function ApplicationUserMenu() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.authentication.user);
  const handleMenuClick = React.useCallback((menuItem) => {
    const { key } = menuItem;
    const menuActionMap = {
      [MENU_KEY.LOGOUT]: () => {
        doLogout();
        navigate("/");
      },
    };

    if (Reflect.has(menuActionMap, key)) {
      menuActionMap[key]();
    } else {
      console.warn(
        `No mapping found for the ${key} action in the ApplicationUserMenu`
      );
    }
  }, []);

  return (
    <>
      {userData ? (
        <Dropdown
          align={{ offset: [0, 0] }}
          menu={{
            items: MENU_ITEMS,
            onClick: handleMenuClick,
          }}
          placement="bottomRight"
          trigger="click"
        >
          <div className="application-user-menu-trigger">
            {userData.userName}
          </div>
        </Dropdown>
      ) : (
        <Menu size="large">
          <Menu.Item>
            <NavLink to="/login">
              <span>Login</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      )}
    </>
  );
}

ApplicationUserMenu.displayName = displayName;

export default ApplicationUserMenu;
