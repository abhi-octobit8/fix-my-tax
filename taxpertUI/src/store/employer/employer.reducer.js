import { EMPLOYER_ACTIONS } from "./employerActionTypes";

const initialState = {
  employerListData: [],
};
export default function requestReducer(state = initialState, action) {
  switch (action.type) {
    case EMPLOYER_ACTIONS.GET_ALL_EMPLOYER_LIST_SUCCESS:
      return {
        ...state,
        employerListData: action.payload,
      };

    default:
      return state;
  }
}
export { initialState };
