import { getStore } from "../../store";
import { EMPLOYER_ACTIONS } from "./employerActionTypes";

const dispatch = getStore().dispatch;

export const setEmployerListData = (payloadData) => {
  dispatch({
    type: EMPLOYER_ACTIONS.GET_ALL_EMPLOYER_LIST_SUCCESS,
    payload: payloadData,
  });
};
