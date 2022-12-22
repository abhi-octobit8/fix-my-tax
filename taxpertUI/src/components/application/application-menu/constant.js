const overflow = {
  adjustX: 1,
  adjustY: 1,
};
const USER_ROLE = {
  PUBLIC: "public",
  AUTHORIZED: "authorize",
  NON_AUTHORIZED: "not authorized",
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
    to: "/home",
  },
  {
    label: "Services",
    role: USER_ROLE.PUBLIC,
    to: "/service/itr-notice",
    children: [
      {
        label: "ITR Notice",
        role: USER_ROLE.PUBLIC,
        to: "/service/itr-notice",
      },
      {
        label: "GST Notice",
        role: USER_ROLE.PUBLIC,
        to: "/service/gst-notice",
      },
    ],
  },
  {
    label: "About",
    role: USER_ROLE.PUBLIC,
    to: "/about",
  },
  {
    label: "Contact Us",
    role: USER_ROLE.PUBLIC,
    to: "/contact",
  },
  {
    label: "Account",
    role: USER_ROLE.AUTHORIZED,
    to: "/request/newrequest",
    children: [
      {
        label: "Request",
        role: USER_ROLE.AUTHORIZED,
        to: "/request/newrequest",
      },
      {
        label: "Pending Request",
        role: USER_ROLE.AUTHORIZED,
        to: "/request/pendingrequest",
      },
    ],
  },
  {
    label: "Register",
    role: USER_ROLE.NON_AUTHORIZED,
    to: "/register",
  },
];
function getMenuItems(collection, userData) {
  let isAuthorized = false;
  if (userData != null) {
    isAuthorized = true;
  }
  const entitledMenuItems = collection.reduce((acc, item) => {
    const { label, role, to } = item;
    const formattedItem = {
      label,
      to,
    };

    let condition = false;
    if (role === USER_ROLE.PUBLIC) {
      condition = true;
    } else if (role === USER_ROLE.AUTHORIZED && isAuthorized) {
      condition = true;
    } else if (role === USER_ROLE.NON_AUTHORIZED && !isAuthorized) {
      condition = true;
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

export { MENU_BUILTIN_PLACEMENTS, MENU_ITEMS, getMenuItems };
