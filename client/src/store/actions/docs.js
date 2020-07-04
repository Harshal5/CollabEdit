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

export const removeDoc = (user_id, doc_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/docs/${doc_id}`)
      .then(() => dispatch(remove(doc_id)))
      .catch(err => {
        addError(err.message);
      });
  };
};

export const fetchDocs = () => {
    return dispatch => {
      return apiCall("get", "/api/docs")
        .then(res => {
          dispatch(loadDocs(res));
        })
        .catch(err => {
          dispatch(addError(err.message));
        });
    };
};