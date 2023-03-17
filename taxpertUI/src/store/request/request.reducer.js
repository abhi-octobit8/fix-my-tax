import { REQUEST_ACTIONS } from "./RequestActionTypes";

const initialState = {
  newRequestList: [],
  ticketListData: [],
  ticketDetails: {},
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
    case REQUEST_ACTIONS.GET_TICKET_DETAILS_SUCCESS:
      return {
        ...state,
        ticketDetails: action.payload,
      };

    default:
      return state;
  }
}
export { initialState };
