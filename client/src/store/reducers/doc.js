import { LOAD_DOC, UPDATE_INPUT, UPDATE_DOC } from '../actionTypes';

const doc = (state = {}, action) => {
    switch (action.type) {
      case LOAD_DOC:
        return action.doc.text;
      case UPDATE_INPUT:
        return action.value;
      case UPDATE_DOC:
        return action.doc;    
      default:
        return state;
    }
};

export default doc;