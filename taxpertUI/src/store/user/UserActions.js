import { getStore } from "../../store";
import { USER_ACTIONS } from "./UserActionTypes";

const dispatch = getStore().dispatch;

export const setUserListData = (payloadData) => {
  dispatch({
    type: USER_ACTIONS.GET_ALL_USER_SUCCESS,
    payload: payloadData,
  });
};
