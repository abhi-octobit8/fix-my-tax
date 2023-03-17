import { getStore } from "../../store";
import { ADVOCATE_ACTIONS } from "./advocateActionTypes";

const dispatch = getStore().dispatch;

export const setAdvocateListData = (payloadData) => {
  dispatch({
    type: ADVOCATE_ACTIONS.GET_ALL_ADVOCATE_LIST_SUCCESS,
    payload: payloadData,
  });
};
