import { PATH } from "../../../../shared/Route";
import { USER_ROLE } from "../../../application/application-menu/constant";

export const MENU_ITEMS = [
  {
    label: "DashBoard",
    key: "dashboard",
    role: [USER_ROLE.ADMIN, USER_ROLE.ADVOCATE, USER_ROLE.CUSTOMER],
    to: "/admin/dashboard",
  },
  {
    label: "All Request",
    key: "ticket",
    role: [USER_ROLE.ADMIN, USER_ROLE.ADVOCATE, USER_ROLE.CUSTOMER],
    to: PATH.TICKET_REQUEST_LIST,
  },
  {
    label: "Assessee",
    key: "user",
    role: [USER_ROLE.ADMIN],
    to: "/admin/user",
  },
  {
    label: "PSP",
    key: "advocate",
    role: [USER_ROLE.ADMIN],
    to: PATH.ADVOCATE_LIST,
  },
];
