import axios from 'axios';
import {
  RESTAURANT_LOGIN_FAIL,
  RESTAURANT_LOGIN_REQUEST,
  RESTAURANT_LOGIN_SUCCESS,
  RESTAURANT_LOGOUT,
  RESTAURANT_REGISTER_FAIL,
  RESTAURANT_REGISTER_REQUEST,
  RESTAURANT_REGISTER_SUCCESS,
  GET_RESTAURANT_SUCCESS,
  GET_RESTAURANT_FAIL,
  GET_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_IMAGE_REQUEST,
  UPDATE_RESTAURANT_IMAGE_SUCCESS,
  UPDATE_RESTAURANT_IMAGE_FAIL,
  RESTAURANT_UPDATE,
} from '../constants.js';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: RESTAURANT_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/restaurant/login', { email, password }, config);

    dispatch({
      type: RESTAURANT_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('restaurantInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: RESTAURANT_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('restaurantInfo');
  dispatch({ type: RESTAURANT_LOGOUT });
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: RESTAURANT_REGISTER_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/restaurant/register', { name, email, password }, config);

    dispatch({
      type: RESTAURANT_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: RESTAURANT_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem('restaurantInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: RESTAURANT_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const getRestaurant = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_RESTAURANT_REQUEST,
    });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.get(`/api/restaurant/${id}`, config);

    dispatch({
      type: GET_RESTAURANT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_RESTAURANT_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateRestaurantImage = (newImage) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_RESTAURANT_IMAGE_REQUEST,
    });
    const {
      restaurant: { info },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: info.token,
      },
    };

    let data;
    if (newImage) {
      const formData = new FormData();
      formData.append('image', newImage);
      data = await axios.put(`/api/restaurant/image`, formData, config);
    } else {
      data = await axios.delete(`/api/restaurant/image`, config);
    }

    data = data.data;

    dispatch({
      type: UPDATE_RESTAURANT_IMAGE_SUCCESS,
    });

    dispatch({
      type: RESTAURANT_UPDATE,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_RESTAURANT_IMAGE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
