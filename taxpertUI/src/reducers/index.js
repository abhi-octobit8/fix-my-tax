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
import order, {
  initialState as orderInitialState,
} from "../store/order/order.reducer";

export default combineReducers({
  authentication,
  request,
  user,
  advocate,
  order,
});

const initialState = {
  authentication: authenticationInitialState,
  request: requestInitialState,
  user: userInitialState,
  advocate: advocateInitialState,
  order: orderInitialState,
};

export { initialState };
