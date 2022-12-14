import React from 'react';
import cx from 'classnames';
import { NavLink } from 'react-router-dom';
import Menu from 'antd/es/menu';
import { MENU_BUILTIN_PLACEMENTS, MENU_ITEMS } from './constant';

import './ApplicationMenu.css';

function getClassName(params) {
  const { isActive } = params;

  return cx('application-menu-item-link', {
    'application-menu-item-link-active': isActive,
  });
}

const displayName = 'ApplicationMenu';

function ApplicationMenu() {
  const menuItems = MENU_ITEMS.map((item) => {
    if (Array.isArray(item.children)) {
      return {
        children: item.children.map((child) => {
          return {
            key: child.to,
            label: (
              <span className="application-menu-item">
                <NavLink className={getClassName} to={child.to}>
                  {child.label}
                </NavLink>
              </span>
            ),
          };
        }),
        className: 'application-menu-item-wrap',
        key: `${item.to}:root`,
        label: (
          <NavLink className={getClassName} to={item.to}>
            <span className="application-menu-item">{item.label}</span>
          </NavLink>
        ),
      };
    }

    return {
      className: 'application-menu-item-wrap',
      key: item.to,
      label: (
        <span className="application-menu-item">
          <NavLink className={getClassName} to={item.to}>
            {item.label}
          </NavLink>
        </span>
      ),
    };
  });



  return (
    <Menu
      builtinPlacements={MENU_BUILTIN_PLACEMENTS}
      className="application-menu"
      items={menuItems}
      mode="horizontal"
      // selectedKeys={selectedKeys}
      size="large"
      triggerSubMenuAction="hover"
    />
  );
}

ApplicationMenu.displayName = displayName;

export default ApplicationMenu;
