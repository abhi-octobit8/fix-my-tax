import { AUTH_ACTIONS } from "./AuthActionTypes";
import { erCache } from "../../shared/storage/erCache";
import API from "../../shared/API";
import { erLocalStorage } from "../../shared/storage/erLocalStorage";
import {
  SESSTION_STORAGE_KEYS,
  STORAGE_KEYS,
} from "../../shared/storage/storageKeys";
import { getStore } from "../../store";

const { getJSONItem, removeItem, setJSONItem, setItem, getItem } =
  erLocalStorage;
const {
  USER_KEY,
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  TABLE_STATE,
  USER_ROLE,
  STORE_DATA,
  MODULE_DATA,
  STORE_IDS,
} = STORAGE_KEYS;
const { TAG_KEY } = SESSTION_STORAGE_KEYS;
const dispatch = getStore().dispatch;
const API_CACHE_PREFIX = "API_CACHE";

const getKeyFromPath = ({ path, queryParams }) => {
  return `${API_CACHE_PREFIX}_${path}_${JSON.stringify(queryParams)}`;
};
export const getUserData = () => {
  return getJSONItem(USER_KEY);
};

export const getLoginUserId = () => {
  return getJSONItem(USER_KEY) && getJSONItem(USER_KEY).id;
};

export const removeSessionStorageKeys = () => {
  erCache.removeItem(getKeyFromPath({ path: TAG_KEY, queryParams: {} }));
};

// const setKeys = ({ userInfo, accessToken, refreshToken, userRole = 1 }) => {
//   if (userInfo) {
//     setJSONItem(USER_KEY, userInfo);
//   }
//   if (accessToken) {
//     setItem(ACCESS_TOKEN, accessToken);
//   }
//   if (refreshToken) {
//     setItem(REFRESH_TOKEN, refreshToken);
//   }
//   if (userRole) {
//     setItem(USER_ROLE, userRole);
//   }
// };

// export const setUserData = ({
//   dispatch,
//   userInfo,
//   accessToken,
//   refreshToken,
//   userRole,
// }) => {
//   setKeys({ userInfo, accessToken, refreshToken, userRole });
//   dispatch({
//     type: AUTH_ACTIONS.SET_USER,
//     payload: userInfo,
//   });
// };

// export const setUserStoreData = ({ dispatch, userInfo }) => {
//   dispatch({
//     type: AUTH_ACTIONS.SET_USER_STORES,
//     payload: userInfo.storeDtoList ?? [],
//   });
// };

// export const setUserStores = (storeData) => async (dispatch) => {
//   dispatch({
//     type: AUTH_ACTIONS.SET_USER_STORES,
//     payload: storeData,
//   });
// };

/// start from here
export const checkLogin = async (userId) => {
  try {
    const userInfo = await API({
      method: "get",
      url: `services/app/User/Get?Id=${userId}`,
    });
    dispatch({
      type: AUTH_ACTIONS.SET_USER,
      payload: userInfo,
    });
  } catch (e) {
    console.error("error id checking the user data", e);
    throw e;
  }
};
export const doLogin = (apiResponse) => {
  const { accessToken, userId } = apiResponse;
  setItem("accessToken", accessToken);
  setItem("userId", userId);
  dispatch({
    type: AUTH_ACTIONS.LOGIN_SUCCESS,
    payload: apiResponse,
  });
};
export const doLogout = () => {
  removeUserData();
};
const removeUserData = () => {
  removeKeys();
  dispatch({
    type: AUTH_ACTIONS.LOG_OUT,
  });
};
const removeKeys = () => {
  removeItem(USER_KEY);
  removeItem(ACCESS_TOKEN);
};
