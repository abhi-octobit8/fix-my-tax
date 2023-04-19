const FIELD_NAME = {
  NAME: "name",
  EMAIL: "email",
  SECTION: "section",
  PRICE: "price",
  UPLOAD_DOCUMENT: "uploadDocument",
  PHONE_NUMBER: "phoneNumber",
  DATE: "date",
};

const AVAILABLE_SLOT = [
  {
    id: 1,
    value: "3:00 to 3:20",
    available: false,
  },
  {
    id: 2,
    value: "3:30 to 3:50",
    available: false,
  },
  {
    id: 3,
    value: "4:00 to 4:20",
    available: true,
  },
  {
    id: 4,
    value: "4:30 to 4:50",
    available: false,
  },
  {
    id: 5,
    value: "5:00 to 5:20",
    available: true,
  },
  {
    id: 6,
    value: "5:30 to 5:50",
    available: true,
  },
];
export { FIELD_NAME, AVAILABLE_SLOT };
