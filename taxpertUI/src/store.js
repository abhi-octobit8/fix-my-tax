import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer, { initialState } from "./reducers";
import HydrateService from "./services/HydrateService";

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
