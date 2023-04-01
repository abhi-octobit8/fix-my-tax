import axios from "axios";
import {
  // API_END_POINT,
  API_STATUSES,
} from "./constants";
import { showMessage, showNotification } from "./utils";
import { STORAGE_KEYS } from "./storage/storageKeys";
import { erLocalStorage } from "./storage/erLocalStorage";
import { erCache } from "./storage/erCache";
import { isEmpty, get } from "lodash";
import { getStore } from "../store";
const API_END_POINT_NEW = process.env.REACT_APP_API_END_POINT;
const dispatch = getStore().dispatch;
const { getItem, getJSONItem, setItem } = erLocalStorage;
const { ACCESS_TOKEN, REFRESH_TOKEN } = STORAGE_KEYS;
const byPassAuthAPIs = [
  "/TokenAuth/Authenticate",
  "services/app/RegisterService/Create",
];

const API_CACHE_PREFIX = "API_CACHE";
const getKeyFromPath = ({ path, queryParams }) => {
  return `${API_CACHE_PREFIX}_${path}_${JSON.stringify(queryParams)}`;
};

const getAPICacheData = ({ path, queryParams }) => {
  const cachedData = erCache.getJSONItem(getKeyFromPath({ path, queryParams }));
  return isEmpty(cachedData) ? null : cachedData;
};

const setAPIDataToCache = ({ path, queryParams, data }) => {
  erCache.setJSONItem({
    key: getKeyFromPath({ path, queryParams }),
    value: data,
  });
};
var CancelToken = axios.CancelToken;
var source;
const API = async (apiData) => {
  const {
    url,
    method,
    queryParams = {},
    formData,
    body,
    isCancelToken,
    cache,
    headers = {},
    successMessage,
    hideErrorMessage,
    responseTypeData,
  } = apiData;
  try {
    let apiUrl = `/${url}`.replace(/\/\//g, "/");
    const accessToken = getItem(ACCESS_TOKEN);
    let requestHeaders = { ...headers, "abp.tenantid": 1 };
    if (byPassAuthAPIs.indexOf(url) === -1) {
      requestHeaders = {
        ...headers,
        "abp.tenantid": 1,
        Authorization: `Bearer ${accessToken}`,
        Accept: `application/json, text/plain`,
      };
    }

    let response;
    if (isCancelToken && typeof source != typeof undefined) {
      source.cancel();
    }
    source = CancelToken.source();
    apiUrl = `${API_END_POINT_NEW}${apiUrl}`;
    // If the APIs are called for the services then the token data in the query string as well.
    // if (apiUrl.indexOf("/services") === 0) {
    //   queryParams.token = accessToken;
    // } else {
    //   //DO append the API end point only if the url is not the service url
    //   apiUrl = `${API_END_POINT}${apiUrl}`;
    // }
    if (cache && getAPICacheData({ path: apiUrl, queryParams })) {
      response = getAPICacheData({ path: apiUrl, queryParams });
    } else {
      response = await axios.request({
        method: method || "GET",
        url: apiUrl,
        data: formData || body,
        params: queryParams,
        headers: requestHeaders,
        cancelToken: source.token,
        responseType: responseTypeData ? responseTypeData : null,
      });
      if (cache) {
        setAPIDataToCache({ path: apiUrl, queryParams, data: response });
      }
    }
    if (successMessage) {
      showMessage({ message: successMessage, type: "success" });
    }
    //this is for excel report data
    if (responseTypeData) {
      return response.data;
    } else {
      return response.data.result;
    }
  } catch (exception) {
    debugger;
    const exceptionResponse = exception.response;
    if (exceptionResponse.data.error) {
      // if (url != "/employee") {
      showNotification({
        message: exceptionResponse.data.error.message,
        // description: exceptionResponse.data.error.details,
        type: "error",
      });
      // }
      // if (exceptionResponse.data.exception) {
      //   return await handleError({
      //     exception,
      //     url,
      //     apiData,
      //     hideErrorMessage: true,
      //   });
      // }
    }
    if (axios.isCancel(exception)) {
      // console.log("cancelled",exception);
    } else {
      console.log("Exception on API call", url, exception);
      return await handleError({ exception, url, apiData, hideErrorMessage });
    }
  } finally {
  }
};

API.get = (url, options) => API({ url, method: "get", ...options });
API.put = (url, body, options) => API({ url, body, method: "put", ...options });
API.patch = (url, body, options) =>
  API({ url, body, method: "patch", ...options });
API.post = (url, body, options) =>
  API({ url, body, method: "post", ...options });
API.delete = (url, body, options) =>
  API({ url, body, method: "delete", ...options });

const handle401Error = async ({ apiData, exception }) => {
  try {
    const { accessToken: oldAccessToken, refreshToken: oldRefreshToken } = {
      accessToken: getJSONItem(ACCESS_TOKEN),
      refreshToken: getItem(REFRESH_TOKEN),
    };
    // const { access: accessToken, refresh: refreshToken } = await API({
    //   url: "/refreshToken",
    //   hideErrorMessage: true,
    //   headers: {
    //     refreshToken: oldRefreshToken,
    //     Authorization: `Bearer ${oldAccessToken}`,
    //   },
    // });
    // setItem(ACCESS_TOKEN, accessToken);
    // setItem(REFRESH_TOKEN, refreshToken);
    if (apiData.throwErrorOnTokenTimeout) {
      exception.reason = "resetRefreshToken";
      throw exception;
    } else {
      return await API(apiData);
    }
  } catch (authError) {
    window.dispatchEvent(new Event("authError"));
    exception.message =
      "Your session is expired, please login again to continue.";
    if (exception.reason) {
      exception.message = "";
    }
    throw exception;
  }
};

const handleError = async ({ exception, url, apiData, hideErrorMessage }) => {
  const { throwException = true, errorMessage, showAPIError } = apiData;
  if (
    exception.response &&
    (exception.response.status === 401 || exception.response.status === 403) &&
    url !== "/checkLogin" &&
    url !== "/employee" &&
    url !== "/authenticate" &&
    url !== "/refreshToken"
  ) {
    try {
      // return await handle401Error({ apiData, exception });
    } catch (e) {
      showMessage({
        message: exception.message || "Something went wrong.",
        type: "error",
      });
      if (throwException) {
        throw exception;
        // throw new HttpError(exception.message, exception.status, exception.json);
      }
    }
  } else {
    if (!hideErrorMessage) {
      let errMessage = errorMessage;
      if (showAPIError) {
        errMessage = get(exception, "response.data.message");
      }
      showMessage({
        message: errMessage || exception.message || "Something went wrong.",
        type: "error",
      });
    }
    if (throwException) {
      throw exception;
      // throw new HttpError(exception.message, exception.status, exception.json);
    }
  }
};

export const dispatchAPILoading = ({ actionType }) => {
  dispatch({
    type: actionType,
    payload: { status: API_STATUSES.LOADING, data: null },
  });
};

export const dispatchAPIError = ({ actionType }) => {
  dispatch({
    type: actionType,
    payload: { status: API_STATUSES.ERROR, data: null },
  });
};

export const dispatchAPISuccess = ({ actionType, apiResponse }) => {
  dispatch({
    type: actionType,
    payload: { status: API_STATUSES.SUCCESS, data: apiResponse },
  });
};

export const callAPIWithRedux = async ({
  actionType,
  apiData,
  handleError,
  processResponse,
}) => {
  try {
    dispatchAPILoading({ actionType });
    let apiResponse = await API(apiData);
    apiResponse = processResponse ? processResponse(apiResponse) : apiResponse;
    dispatchAPISuccess({ actionType, apiResponse });
    return apiResponse;
  } catch (e) {
    dispatchAPIError({ actionType });
    if (!handleError) {
      throw e;
    }
  }
};

export default API;
