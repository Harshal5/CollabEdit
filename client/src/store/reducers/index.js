import { combineReducers } from "redux";
import currentUser from "./currentUser";
import errors from "./errors";
import docs from "./docs";

const rootReducer = combineReducers({
    currentUser,
    errors,
    docs
});

export default rootReducer;
