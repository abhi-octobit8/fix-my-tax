import { getStore } from "../../store";
import { REQUEST_ACTIONS } from "./RequestActionTypes";

const dispatch = getStore().dispatch;

export const setNewRequestData = (payloadData) => {
  dispatch({
    type: REQUEST_ACTIONS.NEW_REQUEST_SUCCESS,
    payload: payloadData,
  });
};
export const setTicketListData = (payloadData) => {
  dispatch({
    type: REQUEST_ACTIONS.GET_ALL_TICKET_SUCCESS,
    payload: payloadData,
  });
};
export const setTicketDetailsData = (payloadData) => {
  dispatch({
    type: REQUEST_ACTIONS.GET_TICKET_DETAILS_SUCCESS,
    payload: payloadData,
  });
};
