import { VALIDATION_PATTERN } from "./constants";

export const isNumber = (string) => {
  return !isNaN(Number(string));
};

export const isPositiveNumber = (string) => {
  return isNumber(string) && Number(string) > 0;
};

export const isInt = (string) => {
  const value = Number(string);
  if (!value) {
    return false;
  }
  return value % 1 === 0 && !string.includes(".");
};

export const isPositiveInt = (string) => {
  return isInt(string) && Number(string) > 0;
};

export const isFloat = (string) => {
  const value = Number(string);
  if (!value) {
    return false;
  }
  return value % 1 !== 0 || string.includes(".");
};

export const positiveFloatValidator = {
  validator: (rule, value) => {
    if (value === null || value === undefined || value === "") {
      return Promise.resolve();
    }
    if (isNaN(parseFloat(value))) {
      return Promise.reject("Please provide valid value.");
    }
    if (value < 0) {
      return Promise.reject("Please provide valid value.");
    } else {
      return Promise.resolve();
    }
  },
};

export const positiveNonZeroFloatValidator = {
  validator: (rule, value) => {
    if (value === null || value === undefined || value === "") {
      return Promise.resolve();
    }
    if (isNaN(parseFloat(value))) {
      return Promise.reject("Please provide valid value.");
    }
    if (value <= 0) {
      return Promise.reject("Please provide valid value.");
    } else {
      return Promise.resolve();
    }
  },
};

export const emailValidator = {
  pattern: VALIDATION_PATTERN.EMAIL,
  message: "Please provide valid email address",
};
export const passwordValidator = {
  pattern: VALIDATION_PATTERN.PASSWORD,
  message:
    "Password Should Contain  min 8 char length,special,lowecase and uppercase letter",
};

export const phoneNumberValidator = {
  pattern: VALIDATION_PATTERN.PHONE,
  message: "Please provide valid phone number",
};

export const requiredValidator = {
  required: true,
  message: "This field is required",
};

export const maxValidator = ({ max }) => ({
  max,
  message: `This field cannot be more than ${max} characters.`,
});
