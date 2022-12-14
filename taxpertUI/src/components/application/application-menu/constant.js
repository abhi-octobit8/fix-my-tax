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

    to: "/services",
    children: [
      {
        label: "ITR Notice",

        to: "/services",
      },
      {
        label: "GST Notice",

        to: "/services1",
      },
    ],
  },
  {
    label: "About",

    to: "/about",
  },
];

export { MENU_BUILTIN_PLACEMENTS, MENU_ITEMS };
