export const VALIDATION_PATTERN = {
  EMAIL: new RegExp(
    /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  ),
  NUMBER: new RegExp('^\\d+$'),
  FLOAT: new RegExp('^\\d*(\\.\\d+)?$'),
  ZIP: new RegExp('^\\d{5}(?:[-\\s]\\d{4})?$'),
  PHONE: new RegExp('^\\d{10}?$'),
};

export const phoneNumberValidator = {
  pattern: VALIDATION_PATTERN.PHONE,
  message: 'Please provide valid phone number',
};

export const requiredValidator = {
  required: true,
  message: 'This field is required',
};
export const emailValidator = {
  pattern: VALIDATION_PATTERN.EMAIL,
  message: 'Please provide valid email address',
};
