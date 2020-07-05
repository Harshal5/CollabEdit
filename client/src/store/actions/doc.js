import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_DOC, UPDATE_INPUT, UPDATE_DOC } from "../actionTypes";

export const loadDoc = doc => ({
    type: LOAD_DOC,
    doc
});

export const updateInput = value => ({
    type: UPDATE_INPUT,
    value
});

export const updateDoc = doc => ({
    type: UPDATE_DOC,
    doc
})


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


export const updateTheDoc = (doc_id) => (dispatch, getState) => {
    let { doc } = getState();
    const text = doc;
    return apiCall("post", `/api/docs/${doc_id}`, { text })
      .then(res => {
        dispatch(updateDoc(res));
      })
      .catch(err => {
        dispatch(addError(err.message));
      });
};

