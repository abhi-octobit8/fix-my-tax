import { combineReducers } from "redux";

import authentication, {
  initialState as authenticationInitialState,
} from "../store/authentication/authentication.reducer";
import request, {
  initialState as requestInitialState,
} from "../store/request/request.reducer";

export default combineReducers({
  authentication,
  request,
});

const initialState = {
  authentication: authenticationInitialState,
  request: requestInitialState,
};

export { initialState };
