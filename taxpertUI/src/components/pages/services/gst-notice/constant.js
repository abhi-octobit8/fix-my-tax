const fillingNoticeData = {
  data: {
    "Salaried Employee / Pensioner with Income from Other Sources": {
      price: 1100,
    },
    "Salaried Employee / Pensioner with Income from Other Sources and House Property Income":
      {
        price: 1500,
      },
    "Salaried Employee / Pensioner with Income from Other Sources, House Property Income & Capital Gain other than Shares":
      {
        price: 2100,
      },
  },
};
const FIELD_NAME = {
  NAME: "name",
  EMAIL: "email",
  SERVICE: "service",
  SECTION: "section",
  SUBSECTION: "subsection",
  PRICE: "price",
  NOTICE_SELECTION: "selectedNotice",
  SELECT_TIME: "date-time-picker",
  UPLOAD_NOTICE: "uploadNotice",
  UPLOAD_GST: "uploadGSTNotice",
  PHONE_NUMBER: "phoneNumber",
};

export { fillingNoticeData, FIELD_NAME };
