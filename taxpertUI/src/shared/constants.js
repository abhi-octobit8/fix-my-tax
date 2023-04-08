export * from "../../src/env/local";

export const API_STATUSES = Object.freeze({
  PENDING: "PENDING",
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
});
// export const SERVICE_TYPE = {
//   CONSULTATION: "consultation",
//   GENERAL: "general",
//   FILING: "filing",
//   ITR_NOTICE: 1,
//   GST_NOTICE: 2,
// };

export const VALIDATION_PATTERN = {
  EMAIL: new RegExp(
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ),
  NUMBER: new RegExp("^\\d+$"),
  FLOAT: new RegExp("^\\d*(\\.\\d+)?$"),
  ZIP: new RegExp("^\\d{5}(?:[-\\s]\\d{4})?$"),
  PHONE: new RegExp("^\\d{10}?$"),
  PASSWORD: new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]+$"),
};

export const TicketStatus = {
  None: 0,
  New: 1,
  Assigned: 2,
  Responded: 3,
  Reopen: 4,
  Resolved: 5,
  Closed: 6,
};
