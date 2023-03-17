import { ADVOCATE_ACTIONS } from "./advocateActionTypes";

const initialState = {
  advocateListData: [],
};
export default function requestReducer(state = initialState, action) {
  switch (action.type) {
    case ADVOCATE_ACTIONS.GET_ALL_ADVOCATE_LIST_SUCCESS:
      return {
        ...state,
        advocateListData: action.payload,
      };

    default:
      return state;
  }
}
export { initialState };
