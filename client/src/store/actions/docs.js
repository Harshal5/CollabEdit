import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_DOCS, REMOVE_DOC } from "../actionTypes";

export const loadDocs = docs => ({
    type: LOAD_DOCS,
    docs
});

export const remove = id => ({
    type: REMOVE_DOC,
    id
});

export const fetchDocs = () => {
    return dispatch => {
      return apiCall("GET", "/api/docs")
        .then(res => {
          dispatch(loadDocs(res));
        })
        .catch(err => {
          dispatch(addError(err.message));
        });
    };
};