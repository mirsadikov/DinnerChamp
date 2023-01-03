import axios from 'axios';
import { RESTAURANT_LOGIN_FAIL, RESTAURANT_LOGIN_REQUEST, RESTAURANT_LOGIN_SUCCESS, RESTAURANT_LOGOUT } from '../constants.js';

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
