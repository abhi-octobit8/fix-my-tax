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
import employer, {
  initialState as employerInitialState,
} from "../store/employer/employer.reducer";

export default combineReducers({
  authentication,
  request,
  user,
  employer,
});

const initialState = {
  authentication: authenticationInitialState,
  request: requestInitialState,
  user: userInitialState,
  employer: employerInitialState,
};

export { initialState };
