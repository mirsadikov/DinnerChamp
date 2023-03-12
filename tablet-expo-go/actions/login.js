import axios from '../config/axios';
import { RESTAURANT_LOGIN_FAIL, RESTAURANT_LOGIN_SUCCESS } from '../constants';

export const login = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {
      data: { id, token },
    } = await axios.post('/api/restaurant/login', { email, password }, config);

    dispatch({
      type: RESTAURANT_LOGIN_SUCCESS,
      payload: { id, token },
    });
  } catch (error) {
    dispatch({
      type: RESTAURANT_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
