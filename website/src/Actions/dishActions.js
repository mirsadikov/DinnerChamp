import axios from '../axiosConfig';
import {
  DISHES_FAIL,
  GET_DISHES_REQUEST,
  GET_DISHES_SUCCESS,
  ADD_DISH_REQUEST,
  ADD_DISH_SUCCESS,
  DISH_FORM_FAIL,
  DISH_LIST_ADD,
  DISH_LIST_REMOVE,
  DISHES_LOADING,
} from '../constants';

export const getAllDishes = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_DISHES_REQUEST,
    });

    const {
      info: { id },
    } = getState().auth;

    const { data } = await axios.get(`/api/dish/${id}/all`);

    dispatch({
      type: GET_DISHES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISHES_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createDish = (dish, category) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_DISH_REQUEST,
    });

    const {
      info: { id, token },
    } = getState().auth;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    const { data } = await axios.post(`/api/dish/${id}`, dish, config);

    dispatch({
      type: ADD_DISH_SUCCESS,
    });

    console.log(category);

    dispatch({
      type: DISH_LIST_ADD,
      payload: { ...data, category },
    });
  } catch (error) {
    dispatch({
      type: DISH_FORM_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteDish = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DISHES_LOADING,
    });
    const {
      info: { token },
    } = getState().auth;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    await axios.delete(`/api/dish/${id}`, config);

    dispatch({
      type: DISH_LIST_REMOVE,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: DISHES_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
