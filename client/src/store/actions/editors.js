import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_EDITORS } from "../actionTypes";

export const loadEditors = editors => ({
    type: LOAD_EDITORS,
    editors
});

export const fetchEditors = () => {
    return dispatch => {
      return apiCall("get", "/api/editors")
        .then(res => {
          dispatch(loadEditors(res));
        })
        .catch(err => {
          dispatch(addError(err.message));
        });
    };
};