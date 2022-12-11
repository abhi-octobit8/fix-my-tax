// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
// import rootReducer from "./reducers";

// const middleware = [thunk];

// let _store = null;

// export const getStore = () => {
//   if (_store === null) {
//     return configureStore();
//   } else {
//     return _store;
//   }
// };
// export const configureStore = () => {
//   _store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(...middleware))
//   );
//   return _store;
// };

import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// import rootReducer from "../reducers/index";
import RootReducer, { initialState } from "./reducers";
import HydrateService from "./services/HydrateService";
// import rootReducer from "./reducers";
// import HydrateService from "../services/HydrateService";

let _store = null;

export const getStore = () => {
  if (_store === null) {
    return configureStore();
  } else {
    return _store;
  }
};

export const configureStore = () => {
  const preloadedState = HydrateService.getStoreInitialState(initialState);

  _store = createStore(
    RootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
  );
  return _store;
};

// export default store;
