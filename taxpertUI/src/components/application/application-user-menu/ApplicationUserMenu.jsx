import React, { useState } from "react";
import Dropdown from "antd/es/dropdown";
import { MENU_ITEMS, MENU_KEY } from "./constant";

import "./ApplicationUserMenu.css";
import { Menu } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { doLogout } from "../../../store/authentication/AuthActions";
import ChangePassword from "./change-password/ChangePassword";

const displayName = "ApplicationUserMenu";

function ApplicationUserMenu() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.authentication.user);
  const [modalOpen, setModalOpen] = useState(false);

  const onHandleClose = React.useCallback(() => {
    setModalOpen(false);
  }, []);
  const handleMenuClick = React.useCallback((menuItem) => {
    const { key } = menuItem;
    const menuActionMap = {
      [MENU_KEY.CHANGE_PASSWORD]: () => {
        setModalOpen(true);
      },
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
          <div className="application-user-menu-trigger">{userData.name}</div>
        </Dropdown>
      ) : (
        <Menu size="large">
          <Menu.Item>
            <NavLink to="/login">
              <span className="application-user-menu-trigger">Login</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      )}
      <ChangePassword open={modalOpen} onClose={onHandleClose} />
    </>
  );
}

ApplicationUserMenu.displayName = displayName;

export default ApplicationUserMenu;
