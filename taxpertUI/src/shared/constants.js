// export * from "../../../src/env/local";
export * from "../../src/env/local";

export const API_STATUSES = Object.freeze({
  PENDING: "PENDING",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
});

export const GRID = {
  PAGE_SIZE: 25,
};

export const VALIDATION_PATTERN = {
  EMAIL: new RegExp(
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ),
  NUMBER: new RegExp("^\\d+$"),
  FLOAT: new RegExp("^\\d*(\\.\\d+)?$"),
  ZIP: new RegExp("^\\d{5}(?:[-\\s]\\d{4})?$"),
  PHONE: new RegExp("^\\d{10}?$"),
};

export const UI_VARIABLES = {
  H_GUTTER: 20,
  V_GUTTER: 20,
};

export const DEFAULT_SEARCH_RESULT_SIZE = 15;

export const SELECT_ADDRESS_KEY =
  "${address1}, ${address2}, ${state},${city}, ${zip}, ${country}";

export const DATE_FORMATS = {
  DEFAULT_DATE_TIME_FORMAT: "YYYY-MM-DD HH:mm:ss",
  LIST_DATE_TIME_FORMAT: "YYYY-MM-DD hh:mm A",
  TIMESTAMP_FORMAT: "MM-DD-YY hh:mm A",
  DEFAULT_DATE_FORMAT: "YYYY-MM-DD",
  DATE: "YYYY-MM-DD",
  TIME: "hh:mm:ss A",
};

export const ORDER_STATUS_COLOR_MAPPINGS = Object.freeze({
  Pending: "#cfc069",
  Abandoned: "red",
  "Pro Forma": "orange",
  "Pending Fulfilment": "orange",
  "Pending Payment": "#afa6a6",
  Picking: "#ffae42",
  "Partially Picked": "blue",
  Picked: "blue",
  Shipping: "#cfc069",
  "Partially Shipped": "#cfc069",
  "Pending Shipment": "orange",
  Shipped: "#cfc069",
  "Partially Paid": "green",
  Paid: "green",
  "Payment Due": "green",
  Completed: "green",
  Approved: "green",
  Declined: "red",
  Canceled: "red",
  Failed: "red",
  Test: "#afa6a6",
});

export const RMA_COLOR_CODE_MAPPINGS = Object.freeze({
  "Request Sent": "orange",
  "Request Received": "#5bb55a",
  "Label Created": "#F63C41",
  "Package Sent": "#ffae42",
  "Package Received": "green",
  "Resolution Pending": "orange",
  Completed: "green",
  Abandoned: "red",
  Canceled: "red",
});

export const RMA_STATUSES = Object.freeze(Object.keys(RMA_COLOR_CODE_MAPPINGS));
export const STORE_SOURCES = Object.freeze([
  { text: "ERP", value: 1 },
  { text: "Ecommerce-Website", value: 2 },
]);

export const PURCHASE_ORDER_STATUSES = Object.freeze(
  Object.keys(ORDER_STATUS_COLOR_MAPPINGS)
);
export const SALES_ORDER_STATUSES = Object.freeze(
  Object.keys(ORDER_STATUS_COLOR_MAPPINGS)
);
export const SHIPPABLE_STATUSES = Object.freeze([
  "Shipping",
  "PartiallyShipped",
  "Shipped",
  "Picked",
  "Paid",
]);

export const SELECTED_FILTERS =
  "Pro Forma,Pending Fulfilment,Pending Payment,Picking,Partially Picked,Pending Shipment,Picked,Partially Shipped,Shipping,Shipped,Partially Paid,Paid,Payment Due,Completed,Approved";
