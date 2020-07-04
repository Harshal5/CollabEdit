import { LOAD_DOCS, REMOVE_DOC } from "../actionTypes";

const doc = (state = [], action) => {
  switch (action.type) {
    case LOAD_DOCS:
      return [...action.docs];
    case REMOVE_DOC:
      return state.filter(doc => doc._id !== action.id);
    default:
      return state;
  }
};

export default doc;
