const overflow = {
  adjustX: 1,
  adjustY: 1,
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

    to: "/home",
  },
  {
    label: "Services",

    to: "/service/itr-notice",
    children: [
      {
        label: "ITR Notice",

        to: "/service/itr-notice",
      },
      {
        label: "GST Notice",

        to: "/service/gst-notice",
      },
    ],
  },
  {
    label: "About",

    to: "/about",
  },
  {
    label: "Account",

    to: "/request/newrequest",
    children: [
      {
        label: "Request",

        to: "/request/newrequest",
      },
      {
        label: "Pending Request",

        to: "/request/pendingrequest",
      },
    ],
  },
];

export { MENU_BUILTIN_PLACEMENTS, MENU_ITEMS };
