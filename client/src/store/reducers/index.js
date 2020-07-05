import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import docs from "./docs";
import doc from "./doc";

const rootReducer = combineReducers({
    currentUser,
    errors,
    docs,
    doc
});

export default rootReducer;
