import * as React from 'react';

import { Avatar, Col, Layout, Menu } from 'antd';
import { L, isGranted } from '../../lib/abpUtility';

// import AbpLogo from '../../images/Indian-post.jpg';
import AbpLogo2 from '../../images/India_Post_Logo3.png';
import utils from '../../utils/utils';
import { MENU_ITEMS } from './constant';
import './index.less';

const { Sider } = Layout;

export interface ISiderMenuProps {
  path: any;
  collapsed: boolean;
  onCollapse: any;
  history: any;
}

const SiderMenu = (props: ISiderMenuProps) => {
  const { collapsed, history, onCollapse } = props;
  const currentRoute = utils.getRoute(history.location.pathname);
  return (
    <Sider
      trigger={null}
      className={'sidebar'}
      width={256}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      {collapsed ? (
        <Col style={{ textAlign: 'center', backgroundColor: 'white' }}>
          <Avatar shape="square" style={{ height: 27, width: 64 }} src={AbpLogo2} />
        </Col>
      ) : (
        <Col style={{ textAlign: 'center', backgroundColor: 'white' }}>
          {/* <Avatar shape="square" style={{ height: 54, width: 128 }} src={AbpLogo} /> */}
          <Avatar shape="square" style={{ height: '100%', width: '100%' }} src={AbpLogo2} />
        </Col>
      )}

      <Menu
        theme="dark"
        className={'menu'}
        mode="inline"
        selectedKeys={[currentRoute ? currentRoute.path : '']}
      >
        {MENU_ITEMS.filter((item: any) => !item.isLayout && item.showInMenu).map(
          (route: any, index: number) => {
            if (route.permission && !isGranted(route.permission)) return null;

            // return (
            //   <Menu.Item key={route.path} onClick={() => history.push(route.path)}>
            //     <route.icon />
            //     <span>{L(route.title)}</span>
            //   </Menu.Item>
            // );
            return (
              <>
                {route.subMenu ? (
                  <Menu.SubMenu title={route.title}>
                    {route.subMenu.map((subRoute: any) => {
                      return (
                        <>
                          <Menu.Item
                            key={subRoute.path}
                            onClick={() => history.push(subRoute.path)}
                          >
                            <route.icon />
                            <span>{L(subRoute.title)}</span>
                          </Menu.Item>
                        </>
                      );
                    })}
                  </Menu.SubMenu>
                ) : (
                  <Menu.Item key={route.path} onClick={() => history.push(route.path)}>
                    <route.icon />
                    <span>{L(route.title)}</span>
                  </Menu.Item>
                )}{' '}
              </>
            );
          }
        )}
      </Menu>
    </Sider>
  );
};

export default SiderMenu;
