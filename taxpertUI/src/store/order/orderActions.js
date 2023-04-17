import { getStore } from "../../store";
import { ORDER_ACTIONS } from "./orderActionTypes";

const dispatch = getStore().dispatch;

// export const setAdvocateListData = (payloadData) => {
//   dispatch({
//     type: ADVOCATE_ACTIONS.GET_ALL_ADVOCATE_LIST_SUCCESS,
//     payload: payloadData,
//   });
// };
export const setOrderData = (payloadData) => {
  dispatch({
    type: ORDER_ACTIONS.SET_ORDER_DATA,
    payload: payloadData,
  });
};
