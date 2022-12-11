// import * as Types from "../actions/actionTypes";
// import initialState from "./initialState";

import { AUTH_ACTIONS } from "./AuthActionTypes";

const initialState = {
  userSession: null,
};
export default function authenticationReducer(
  state = initialState.userSession,
  action
) {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      debugger;
      return {
        ...state,
        userSession: action.payload,
      };
    case AUTH_ACTIONS.LOG_OUT:
      return { ...initialState };
    default:
      return state;
  }
}
export { initialState };
