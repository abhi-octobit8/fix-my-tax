import { USER_ROLE } from "../../../application/application-menu/constant";

const TICKET_LIST_ACTION = {
  ASSIGN: "Assign",
  DELETE: "Delete",
};

const items = [
  {
    key: TICKET_LIST_ACTION.ASSIGN,
    label: TICKET_LIST_ACTION.ASSIGN,
  },
  {
    key: TICKET_LIST_ACTION.DELETE,
    label: TICKET_LIST_ACTION.DELETE,
  },
];
const getActionItems = (data, role) => {
  debugger;
  let newArr = [...data];
  if (role !== USER_ROLE.ADMIN) {
    newArr.splice(0, 1);
  }
  return newArr;
};
export { items, TICKET_LIST_ACTION, getActionItems };
