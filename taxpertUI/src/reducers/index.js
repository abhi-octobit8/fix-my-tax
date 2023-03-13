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
import advocate, {
  initialState as advocateInitialState,
} from "../store/advocate/advocate.reducer";

export default combineReducers({
  authentication,
  request,
  user,
  advocate,
});

const initialState = {
  authentication: authenticationInitialState,
  request: requestInitialState,
  user: userInitialState,
  advocate: advocateInitialState,
};

export { initialState };
