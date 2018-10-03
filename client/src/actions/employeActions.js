import axios from "axios";
import {
  GET_EMPS,
  GET_EMP,
  DELETE_EMP,
  ADD_EMP,
  EMP_LOADING
} from "../actions/types";

export const getEmps = () => dispatch => {
  dispatch(setEmpsLoading());
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
  dispatch(setEmpsLoading());
  axios.post("/api/employes", item).then(res =>
    dispatch({
      type: ADD_EMP,
      payload: res.data
    })
  );
};

export const deleteEmp = item => dispatch => {
  dispatch(setEmpsLoading());
  axios.delete("/api/employes/delete/" + item).then(res =>
    dispatch({
      type: DELETE_EMP,
      payload: res.data
    })
  );
};

export const setEmpsLoading = () => {
  return {
    type: EMP_LOADING
  };
};
