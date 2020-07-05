import { apiCall } from "../../services/api";
import { addError } from "./errors";
import { LOAD_DOCS, REMOVE_DOC, POST_DOC } from "../actionTypes";

export const loadDocs = docs => ({
    type: LOAD_DOCS,
    docs
});

export const remove = id => ({
    type: REMOVE_DOC,
    id
});

export const postDoc = doc => ({
    type: POST_DOC,
    doc
}); 

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


export const removeDoc = (user_id, doc_id) => {
  return dispatch => {
    return apiCall("delete", `/api/users/${user_id}/docs/${doc_id}`)
      .then(() => dispatch(remove(doc_id)))
      .catch(err => {
        addError(err.message);
      });
  };
};


// export const fetchDoc = (doc_id) => {
//   return dispatch => {
//     return apiCall("get", `/api/docs/${doc_id}`)
//       .then(res => {
//         // console.log(res);
//         dispatch(loadDoc(res));
//       })
//       .catch(err => {
//         dispatch(addError(err.message));
//       });
//   };
// };

export const postNewDoc = text => (dispatch, getState) => {
  let { currentUser } = getState();
  const id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/docs/new`, { text })
    .then((res => {dispatch(postDoc(res.data))}))
    .catch(err => dispatch(addError(err.message)));
};