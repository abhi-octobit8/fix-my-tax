import { notification, message as AntMessage } from 'antd';
import { template } from 'lodash';
import API from './API';
import qs from 'qs';

export const showNotification = ({ type, message, description, ...props }) => {
  if (type) {
    //Show the notification according to  type
    return notification[type]({
      message: message || toCapitalCase(type),
      description,
      duration: null,
      ...props,
    });
  } else {
    //Show the general notification
    return notification.open({ message, description, ...props });
  }
};

export const showMessage = ({ type, message, ...props }) => {
  if (type) {
    return AntMessage[type](message);
  } else {
    return AntMessage.open({ content: message, ...props });
  }
};

export const message = {
  error: (message, props) =>
    showMessage({ type: 'error', message, ...{ ...props, duration: 10000 } }),
  success: (message, props) =>
    showMessage({ type: 'success', message, ...props }),
  warn: (message, props) => showMessage({ type: 'warn', message, ...props }),
  info: (message, props) => showMessage({ type: 'info', message, ...props }),
};

export const getRandomString = (length = 16) => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

export const toCapitalCase = (string) => {
  if (!string) {
    return string;
  }
  return string[0].toUpperCase() + string.slice(1);
};

export const sleep = (timeout = 3000) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), timeout);
  });
};

export const toFixed = (floatValue) => {
  if (!isNaN(parseFloat(floatValue))) {
    const roundedString = parseFloat(floatValue).toFixed(2);
    return Number(roundedString);
  } else {
    return 0;
  }
};

export const toFixedString = (floatValue) => {
  if (!isNaN(parseFloat(floatValue))) {
    return floatValue.toFixed(2);
  } else {
    return '0.00';
  }
};

export const parseNumber = (numberValue) => {
  const parsedNumber = Number(numberValue);
  return isNaN(parsedNumber) ? 0 : parsedNumber;
};

export const getFullAddress = ({
  address1,
  address2,
  city,
  state,
  zip,
  country,
}) => {
  return `${address1 ? `${address1}` : ''}${address2 ? `, ${address2}` : ''}${
    city ? `, ${city}` : ''
  }${state ? `, ${state}` : ''}${zip ? `, ${zip}` : ''}${
    country ? `, ${country}` : ''
  }`;
};

const updatedAlias = (name) => {
  return String(name || '')
    .replace(/[^a-zA-Z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/-+$/g, '');
};

export const updateAlias = ({ newValue, oldValue, form, fieldName }) => {
  const oldUrlAliasValue = form.getFieldValue(fieldName);
  const oldUrlAliasFromProduct = updatedAlias(oldValue);
  if (!newValue && !oldValue) {
    return;
  }
  if (oldUrlAliasValue === oldUrlAliasFromProduct || !oldUrlAliasValue) {
    form.setFields([{ name: fieldName, value: updatedAlias(newValue) }]);
    form.validateFields([fieldName]);
  }
  if (!newValue && oldValue) {
    form.setFields([{ name: fieldName, value: '' }]);
    form.validateFields([fieldName]);
  }
};

export const getLabelValue = ({ labelKey, option }) => {
  try {
    if (typeof labelKey === 'function') {
      return labelKey(option);
    } else {
      return labelKey.indexOf('${') > -1
        ? template(labelKey)(option)
        : option[labelKey];
    }
  } catch (e) {
    return '';
  }
};

export const isFalsyValueWithoutZero = (value) => {
  return !value && value !== 0;
};

export const renderMoney = (value) => {
  let returnValue = '$0.00';
  try {
    if (value) {
      returnValue = value < 0 ? `-$${Math.abs(value)}` : `$${value.toFixed(2)}`;
    }
  } catch (e) {
    console.log();
  }
  return returnValue;
};

export const forEachAsyncParallel = async (data, iteratee, limit = 20) => {
  const collection = [...data];
  const { length } = collection;
  let output = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length / limit; i++) {
    // eslint-disable-next-line no-underscore-dangle,no-await-in-loop
    output = [
      ...output,
      ...(await Promise.all(
        __getForEachItretee(collection.splice(0, limit), iteratee),
      )),
    ];
  }
  return output;
};

// eslint-disable-next-line no-underscore-dangle
const __getForEachItretee = (collection, iteratee) => {
  const collectionFunctions = [];
  for (let i = 0; i < collection.length; i += 1) {
    collectionFunctions.push(iteratee.call(this, collection[i]));
  }
  return collectionFunctions;
};

export const isNullUndefined = (value) => {
  return value === undefined || value === null;
};

export const numberFormatter = (num, digits = 0) => {
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'K' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'G' },
    { value: 1e12, symbol: 'T' },
    { value: 1e15, symbol: 'P' },
    { value: 1e18, symbol: 'E' },
  ];
  const expression = /\.0+$|(\.[0-9]*[1-9])0+$/;
  let i;
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break;
    }
  }
  return (
    (num / si[i].value).toFixed(digits).replace(expression, '$1') + si[i].symbol
  );
};

export const getcsvData = async (url) => {
  try {
    const excelData = await API({
      method: 'GET',
      url: url,
      responseTypeData: 'blob',
    });
    return excelData;
  } catch (e) {
    message.error('Error in getting csv data.');
  }
};

export const downloadCsvFile = async ({ url, name }) => {
  const data = await getcsvData(url);
  var blob = new Blob([data]);
  const url1 = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url1;
  link.setAttribute('download', `${name}.xlsx`);
  document.body.appendChild(link);
  link.click();
};

export const searchQueryParams = (data) => {
  const query = {
    ...qs.parse(data, { ignoreQueryPrefix: true }), // Convert string to object
  };
  return query;
};

export const copyToClipBoard = (value) => {
  navigator.clipboard
    .writeText(value)
    .then(() => {
      message.success('URL copied to Clipboard');
    })
    .catch(() => {
      message.success('URL cannot be copied to Clipboard');
    });
};

export const print = (location) => {
  const pdfUrl = `${window.location.origin}${location}`;
  const w = window.open(pdfUrl);
  w.print();
};
