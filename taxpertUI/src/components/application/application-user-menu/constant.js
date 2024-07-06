import { LogoutOutlined } from "@ant-design/icons";
const MENU_KEY = {
  LOGOUT: "logout",
  CHANGE_PASSWORD: "changepassword",
};

const MENU_ITEMS = [
  // {
  //   className: "application-user-menu-item",
  //   key: MENU_KEY.CHANGE_PASSWORD,
  //   label: "ChangePassword",
  // },
  {
    className: "application-user-menu-item",
    key: MENU_KEY.LOGOUT,
    label: "logout",
    icon: <LogoutOutlined />,
  },
];

export { MENU_ITEMS, MENU_KEY };
