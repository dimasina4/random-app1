import { GET_POS } from "../actions/types";

const initialState = {
  pos: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_POS:
      return {
        ...state,
        pos: action.payload
      };
    default:
      return state;
  }
}
