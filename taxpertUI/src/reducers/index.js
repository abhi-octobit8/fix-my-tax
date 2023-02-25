import { combineReducers } from "redux";

import authentication, {
  initialState as authenticationInitialState,
} from "../store/authentication/authentication.reducer";
import request, {
  initialState as requestInitialState,
} from "../store/request/request.reducer";
import user, {
  initialState as userInitialState,
} from "../store/user/user.reducer";

export default combineReducers({
  authentication,
  request,
  user,
});

const initialState = {
  authentication: authenticationInitialState,
  request: requestInitialState,
  user: userInitialState,
};

export { initialState };
