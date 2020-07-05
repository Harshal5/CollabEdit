import { LOAD_DOC  } from '../actionTypes';

const doc = (state = {}, action) => {
    switch (action.type) {
      case LOAD_DOC:
        return action.doc;
      default:
        return state;
    }
};

export default doc;