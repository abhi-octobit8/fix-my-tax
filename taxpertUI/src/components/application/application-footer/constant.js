import { PATH } from "../../../shared/Route";

export const MENU_ITEMS_FOOTER_USEFUL_LINKS = [
  {
    label: "Income Tax",
    key: 1,
    to: "https://www.incometax.gov.in/",
  },
  {
    label: "Goods and Services Tax",
    key: 2,
    to: "https://www.gst.gov.in/",
  },
  {
    label: "Ministry of Finance",
    key: 3,
    to: "https://finmin.nic.in/",
  },
  {
    label: "Ministry of Corporate Affairs",
    key: 4,
    to: "https://www.mca.gov.in/ ",
  },
];
export const MENU_ITEMS_SERVICE_FOOTER = [
  {
    label: "About Us",
    key: 1,
    to: PATH.ABOUT,
  },
  {
    label: "Service",
    key: 2,
    to: PATH.ITR_NOTICE_PATH,
  },
  {
    label: "Terms & Condition",
    key: 3,
    to: "/documents/TERMS_CONDITIONS_FMT.pdf",
    file: true,
  },
  {
    label: "Privacy Policy",
    key: 4,
    to: PATH.PRIVACY_POLICY,
  },
];
