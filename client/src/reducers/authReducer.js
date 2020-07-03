import { LOGIN_SUCCESS } from "../actions/types";

const initalState = {
  isAuthenticated: false,
  username:
    localStorage.getItem('username') == null
      ? undefined
      : localStorage.getItem('username')
};

export const loginReducer = (state = initalState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        loggedIn: true,
        username: action.username
      };
    default:
      return state;
  }
};