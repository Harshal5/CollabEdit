import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addError, removeError } from "./errors";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAuthorizationToken(token) {
    setTokenHeader(token);
}

export function logout() {
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false);
        dispatch(setCurrentUser({}));
    };
}

export function authUser(type, userData) {
    return dispatch => {
        return new Promise((resolve, reject) => {   //for making sure our api.js has made the call and we got the res
            return apiCall("post", `/api/${type}`, userData)
                .then(({ token, ...user }) => {
                    localStorage.setItem("jwtToken", token);
                    setAuthorizationToken(token);
                    dispatch(setCurrentUser(user));
                    dispatch(removeError());
                    resolve();
                })
                .catch(err => {
                    dispatch(addError(err.message));
                    reject(); 
                });
        });
    };
}
