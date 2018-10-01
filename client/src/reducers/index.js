import { combineReducers } from "redux";
import employeReducer from "./employeReducer";
import positionsReducer from "./positionsReducer";

export default combineReducers({
  employe: employeReducer,
  positions: positionsReducer
});
