import axios from '../axiosConfig';

import {
  ADD_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  EMPLOYEES_FAIL,
  EMPLOYEES_LOADING,
  EMPLOYEE_FORM_FAIL,
  EMPLOYEE_LIST_ADD,
  EMPLOYEE_LIST_REMOVE,
  GET_EMPLOYEES_REQUEST,
  GET_EMPLOYEES_SUCCESS,
  UPDATE_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_SUCCESS,
} from '../constants';

export const getAllEmployees = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_EMPLOYEES_REQUEST,
    });

    const { info } = getState().auth;

    const config = {
      headers: {
        Authorization: info.token,
      },
    };

    const { data } = await axios.get(`/api/employee`, config);

    dispatch({
      type: GET_EMPLOYEES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEES_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createEmployee = (name, staffId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_EMPLOYEE_REQUEST,
    });

    const {
      info: { token },
    } = getState().auth;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    const { data } = await axios.post(`/api/employee/create`, { staffId, name }, config);

    dispatch({
      type: ADD_EMPLOYEE_SUCCESS,
    });

    dispatch({
      type: EMPLOYEE_LIST_ADD,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_FORM_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateEmployee = (id, name, staffId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_EMPLOYEE_REQUEST,
    });

    const {
      info: { token },
    } = getState().auth;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    await axios.put(`/api/employee/${id}`, { name, staffId }, config);

    dispatch({
      type: UPDATE_EMPLOYEE_SUCCESS,
    });

    dispatch(getAllEmployees());
  } catch (error) {
    dispatch({
      type: EMPLOYEE_FORM_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteEmployee = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EMPLOYEES_LOADING,
    });

    const {
      info: { token },
    } = getState().auth;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    await axios.delete(`/api/employee/${id}`, config);

    dispatch({
      type: EMPLOYEE_LIST_REMOVE,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEES_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
