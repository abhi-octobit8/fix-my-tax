import { combineReducers } from "redux";

import authentication, {
  initialState as authenticationInitialState,
} from "../store/authentication/authentication.reducer";
import request, {
  initialState as requestInitialState,
} from "../store/request/request.reducer";

export default combineReducers({
  // auth,
  // // message,
  authentication,
  request,
  // requestReducer,
});

const initialState = {
  // auth: authInitialState,
  authentication: authenticationInitialState,
  request: requestInitialState,
  // message: messageInitialState,
};

export { initialState };
