import CollectionUtilService from "../../../services/CollectionUtilService";
import { PATH } from "../../../shared/Route";

const overflow = {
  adjustX: 1,
  adjustY: 1,
};
const USER_ROLE = {
  PUBLIC: "public",
  AUTHORIZED: "authorize",
  ADMIN: "ADMIN",
  NON_AUTHORIZED: "not authorized",
  CUSTOMER: "CUSTOMER",
  ADVOCATE: "ADVOCATE",
};
const MENU_BUILTIN_PLACEMENTS = {
  topLeft: {
    offset: [0, -7],
    overflow,
    points: ["bl", "tl"],
  },
  bottomLeft: {
    offset: [0, 0],
    overflow,
    points: ["tl", "bl"],
  },
  leftTop: {
    offset: [-4, 0],
    overflow,
    points: ["tr", "tl"],
  },
  rightTop: {
    offset: [8, 0],
    overflow,
    points: ["tl", "tr"],
  },
};

const MENU_ITEMS = [
  {
    label: "Home",
    role: USER_ROLE.PUBLIC,
    to: PATH.HOME,
  },
  {
    label: "Services",
    role: USER_ROLE.PUBLIC,
    to: "",
    children: [
      {
        label: "ITR Filing",
        role: USER_ROLE.PUBLIC,
        to: PATH.SERVICE_ITR_FILING,
      },
      {
        label: "TDS/TCS Filing",
        role: USER_ROLE.PUBLIC,
        to: PATH.SERVICE_TDS_TCS_FILING,
      },
      {
        label: "ITR/TDS/TCS Notices",
        role: USER_ROLE.PUBLIC,
        to: PATH.ITR_NOTICE_PATH,
      },
      {
        label: "GST Return",
        role: USER_ROLE.PUBLIC,
        to: PATH.SERVICE_GST_RETURN,
      },
      {
        label: "GST Notice",
        role: USER_ROLE.PUBLIC,
        to: PATH.GST_NOTICE,
      },
      {
        label: "Consultation",
        role: USER_ROLE.PUBLIC,
        to: PATH.SERVICE_COSULTATION,
      },
    ],
  },
  {
    label: "About Us",
    role: USER_ROLE.PUBLIC,
    to: PATH.ABOUT,
  },
  {
    label: "MemberShip",
    role: USER_ROLE.PUBLIC,
    to: PATH.MEMBERSHIP,
  },
  {
    label: "Register",
    role: USER_ROLE.NON_AUTHORIZED,
    to: PATH.REGISTER,
  },
  // {
  //   label: "Latest News",
  //   role: USER_ROLE.PUBLIC,
  //   to: PATH.LATEST_NEWS,
  // },
  {
    label: "Contact Us",
    role: USER_ROLE.PUBLIC,
    to: PATH.CONTACT_US,
  },
  // {
  //   label: "Account",
  //   role: [USER_ROLE.CUSTOMER, USER_ROLE.ADMIN, USER_ROLE.ADVOCATE],
  //   to: "/request/newrequest",
  //   children: [
  //     {
  //       label: "Request",
  //       role: USER_ROLE.AUTHORIZED,
  //       to: "/request/newrequest",
  //     },
  //     {
  //       label: "Pending Request",
  //       role: USER_ROLE.AUTHORIZED,
  //       to: "/request/pendingrequest",
  //     },
  //   ],
  // },
  {
    label: "Account",
    role: [USER_ROLE.CUSTOMER, USER_ROLE.ADMIN, USER_ROLE.ADVOCATE],
    to: PATH.TICKET_REQUEST_LIST,
    // children: [
    //   {
    //     label: "DashBoard",
    //     role: [USER_ROLE.CUSTOMER, USER_ROLE.ADMIN, USER_ROLE.ADVOCATE],
    //     to: "/admin/dashboard",
    //   },
    //   // {
    //   //   label: "Pending Request",
    //   //   role: USER_ROLE.ADMIN,
    //   //   to: "/admin/user",
    //   // },
    // ],
  },
];
function getMenuItems(collection, userData) {
  let isAuthorized = false;

  const userAuthRole = userData && userData?.roleNames[0];
  const entitledMenuItems = collection.reduce((acc, item) => {
    const { label, role, to } = item;
    const formattedItem = {
      label,
      to,
    };

    let condition = false;

    if (role === USER_ROLE.PUBLIC) {
      condition = true;
    } else if (role === USER_ROLE.NON_AUTHORIZED && !userAuthRole) {
      condition = true;
    } else {
      const hasRole = CollectionUtilService.hasRole(role, userAuthRole);
      if (hasRole) {
        condition = true;
      }
    }

    if (condition) {
      // take only public
      if (Array.isArray(item.children)) {
        const formattedChildren = getMenuItems(item.children, userData);

        if (formattedChildren.length > 0) {
          formattedItem.children = formattedChildren;

          acc.push(formattedItem);
        }
      } else {
        acc.push(formattedItem);
      }
    }

    return acc;
  }, []);
  return entitledMenuItems;
}

export { MENU_BUILTIN_PLACEMENTS, MENU_ITEMS, USER_ROLE, getMenuItems };
