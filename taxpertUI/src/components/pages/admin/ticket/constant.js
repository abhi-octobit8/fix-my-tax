import { USER_ROLE } from "../../../application/application-menu/constant";

const TICKET_LIST_ACTION = {
  ASSIGN: "Assign",
  DELETE: "Delete",
};

const items = [
  {
    key: TICKET_LIST_ACTION.ASSIGN,
    label: TICKET_LIST_ACTION.ASSIGN,
    role: [USER_ROLE.ADMIN],
  },
];

const getActionItems = (data, role) => {
  let newArr = [...data];
  if (role !== USER_ROLE.ADMIN) {
    // newArr.splice(0, 1);
    return [];
  }
  return newArr;
};

export { items, TICKET_LIST_ACTION, getActionItems };
