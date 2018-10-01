import axios from "axios";
import { GET_POS } from "../actions/types";

export const getPos = () => dispatch => {
  axios.get("/api/positions").then(res =>
    dispatch({
      type: GET_POS,
      payload: res.data
    })
  );
};
