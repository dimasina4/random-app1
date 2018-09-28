import axios from "axios";
import { GET_EMPS, DELETE_EMP, ADD_EMP, EMP_LOADING } from "../actions/types";

export const getEmps = () => dispatch => {
  axios.get("/api/employes").then(res =>
    dispatch({
      type: GET_EMPS,
      payload: res.data
    })
  );
};
