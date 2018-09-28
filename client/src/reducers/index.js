import { combineReducers } from "redux";
import employeReducer from "./employeReducer";

export default combineReducers({
  employe: employeReducer
});
