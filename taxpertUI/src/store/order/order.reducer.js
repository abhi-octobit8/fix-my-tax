// import { ADVOCATE_ACTIONS } from "./advocateActionTypes";

import { ORDER_ACTIONS } from "./orderActionTypes";

const initialState = {
  orderInfo: {},
};
export default function requestReducer(state = initialState, action) {
  switch (action.type) {
    // case ORDER_ACTIONS.GET_ALL_ADVOCATE_LIST_SUCCESS:
    //   return {
    //     ...state,
    //     advocateListData: action.payload,
    //   };
    case ORDER_ACTIONS.SET_ORDER_DATA:
      return {
        ...state,
        orderInfo: action.payload,
      };

    default:
      return state;
  }
}
export { initialState };
