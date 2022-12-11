import { getStore } from "../../store";
import { REQUEST_ACTIONS } from "./RequestActionTypes";

const dispatch = getStore().dispatch;

export const setNewRequestData = (payloadData) => {
  dispatch({
    type: REQUEST_ACTIONS.NEW_REQUEST_SUCCESS,
    payload: payloadData,
  });
};
