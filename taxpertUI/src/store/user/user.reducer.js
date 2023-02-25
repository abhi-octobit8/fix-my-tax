import { USER_ACTIONS } from "./UserActionTypes";

const initialState = {
  userListData: [],
};
export default function requestReducer(state = initialState, action) {
  switch (action.type) {
    case USER_ACTIONS.GET_ALL_USER_SUCCESS:
      return {
        ...state,
        userListData: action.payload,
      };

    default:
      return state;
  }
}
export { initialState };
