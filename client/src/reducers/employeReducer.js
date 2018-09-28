import { GET_EMPS, DELETE_EMP, ADD_EMP, EMP_LOADING } from "../actions/types";

const initialState = {
  emps: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EMPS:
      return {
        ...state,
        emps: action.payload
      };
    default:
      return state;
  }
}
