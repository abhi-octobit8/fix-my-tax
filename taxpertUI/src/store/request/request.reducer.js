import { REQUEST_ACTIONS } from "./RequestActionTypes";

const initialState = {
  newRequestList: [],
  ticketListData: [],
};
export default function requestReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ACTIONS.NEW_REQUEST_SUCCESS:
      return {
        ...state,
        newRequestList: action.payload,
      };
    case REQUEST_ACTIONS.GET_ALL_TICKET_SUCCESS:
      return {
        ...state,
        ticketListData: action.payload,
      };

    default:
      return state;
  }
}
export { initialState };
