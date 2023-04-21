import { USER_ROLE } from "../../../application/application-menu/constant";

const USER_LIST_ACTION = {
  ACTIVATE: "Activate",
  MORE_DETAILS: "Details",
};

const ACTION_ITEMS = [
  {
    key: USER_LIST_ACTION.MORE_DETAILS,
    label: "More Details",
    role: [USER_ROLE.ADMIN],
  },
  {
    key: USER_LIST_ACTION.ACTIVATE,
    label: "Activate",
    role: [USER_ROLE.ADMIN],
  },
];

export { ACTION_ITEMS, USER_LIST_ACTION };
