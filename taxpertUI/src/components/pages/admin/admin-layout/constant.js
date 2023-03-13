import { PATH } from "../../../../shared/Route";

export const MENU_ITEMS = [
  {
    label: "DashBoard",
    key: "dashboard",
    to: "/admin/dashboard",
  },
  {
    label: "All Request",
    key: "ticket",
    to: "/admin/requests",
  },
  {
    label: "User",
    key: "user",
    to: "/admin/user",
  },
  {
    label: "Advocate",
    key: "advocate",
    to: PATH.ADVOCATE_LIST,
  },
];
