import {
  GET_EMPS,
  DELETE_EMP,
  ADD_EMP,
  EMP_LOADING,
  GET_EMP
} from "../actions/types";

const initialState = {
  emps: [],
  emp: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EMPS:
      return {
        ...state,
        emps: action.payload
      };
    case GET_EMP:
      return {
        ...state,
        emp: state.emps.filter(item => item._id === action.payload)[0]
      };
    case ADD_EMP:
      return {
        ...state,
        emps: action.payload
      };
    default:
      return state;
  }
}
