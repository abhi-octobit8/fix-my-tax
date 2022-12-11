import { REQUEST_ACTIONS } from "./RequestActionTypes";

const initialState = {
  newRequestList: [],
};
export default function requestReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ACTIONS.NEW_REQUEST_SUCCESS:
      return {
        ...state,
        newRequestList: action.payload,
      };

    default:
      return state;
  }
}
export { initialState };
