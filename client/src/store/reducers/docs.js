import { LOAD_DOCS, REMOVE_DOC, POST_DOC } from "../actionTypes";

const docs = (state = [], action) => {
  switch (action.type) {
    case LOAD_DOCS:
      return [...action.docs];
    case REMOVE_DOC:
      return state.filter(doc => doc._id !== action.id);
    case POST_DOC:
      return [...state, action.doc];
    default:
      return state;
  }
};

export default docs;
