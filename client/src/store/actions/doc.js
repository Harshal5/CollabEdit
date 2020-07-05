import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_DOC } from "../actionTypes";

export const loadDoc = doc => ({
    type: LOAD_DOC,
    doc
});

export const fetchDoc = (doc_id) => {
    return dispatch => {
      return apiCall("get", `/api/docs/${doc_id}`)
        .then(res => {
          // console.log(res);
          dispatch(loadDoc(res));
        })
        .catch(err => {
          dispatch(addError(err.message));
        });
    };
};