import axios from "axios";
import {
  GET_EMPS,
  GET_EMP,
  DELETE_EMP,
  ADD_EMP,
  EMP_LOADING
} from "../actions/types";

export const getEmps = () => dispatch => {
  axios.get("/api/employes").then(res =>
    dispatch({
      type: GET_EMPS,
      payload: res.data
    })
  );
};

export const getEmp = id => dispatch => {
  // axios
  //   .get("/api/employes/" + id)
  //   .then(res => dispatch({ type: GET_EMP, payload: res.data }));
  dispatch({
    type: GET_EMP,
    payload: id
  });
};

export const setEmp = item => dispatch => {
  axios.post("/api/employes", item).then(res =>
    dispatch({
      type: ADD_EMP,
      payload: res.data
    })
  );
};
