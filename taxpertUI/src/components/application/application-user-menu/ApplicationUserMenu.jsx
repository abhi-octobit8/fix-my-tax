import React from 'react';
import Dropdown from 'antd/es/dropdown';
import { MENU_ITEMS, MENU_KEY } from './constant';

import './ApplicationUserMenu.css';
import { Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const displayName = 'ApplicationUserMenu';

function ApplicationUserMenu() {

const userData = useSelector((state) => state.authentication.user);
console.log(userData);
  // const handleMenuClick = React.useCallback(
  //   (menuItem) => {
  //     const { key } = menuItem;
  //     const menuActionMap = {
  //       [MENU_KEY.LOGOUT]: () => {
  //         const fsa = http.apscout.logout.request()();

  //         dispatch(fsa);
  //       },
  //     };

  //     if (Reflect.has(menuActionMap, key)) {
  //       menuActionMap[key]();
  //     } else {
  //       console.warn(
  //         `No mapping found for the ${key} action in the ApplicationUserMenu`,
  //       );
  //     }
  //   },
  //   [dispatch],
  // );

  return (
    <>
    {/* <Menu>
        <Menu.Item>
        <NavLink  to="/login">
            <span className="application-menu-item">Login</span>
          </NavLink>
        </Menu.Item>
    </Menu> */}
    {userData &&
    <Dropdown
      align={{ offset: [0, 0] }}
      menu={{
        items: MENU_ITEMS,
        // onClick: handleMenuClick,
      }}
      placement="bottomRight"
      trigger="click"
    >
      <div className="application-user-menu-trigger">{userData.userName}</div>
    </Dropdown>
}
    </>
  );
}

ApplicationUserMenu.displayName = displayName;

export default ApplicationUserMenu;
