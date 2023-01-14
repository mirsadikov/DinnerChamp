import axios from '../axiosConfig';

import {
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  CATEGORIES_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
} from '../constants';

export const getCategories = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CATEGORIES_REQUEST,
    });

    const {
      info: { id },
    } = getState().auth;

    const { data } = await axios.get(`/api/category/${id}`);

    dispatch({
      type: GET_CATEGORIES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORIES_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const addCategory = (name) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_CATEGORY_REQUEST,
    });

    const { info } = getState().auth;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: info.token,
      },
    };

    const { data } = await axios.post(`/api/category/create`, { name }, config);

    dispatch({
      type: ADD_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORIES_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_CATEGORY_REQUEST,
    });

    const { info } = getState().auth;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: info.token,
      },
    };

    await axios.delete(`/api/category/${id}`, config);

    dispatch({
      type: DELETE_CATEGORY_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: CATEGORIES_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateCategory = (id, name) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_CATEGORY_REQUEST,
    });

    const { info } = getState().auth;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: info.token,
      },
    };

    const { data } = await axios.put(`/api/category/${id}`, { name }, config);

    dispatch({
      type: UPDATE_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATEGORIES_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
