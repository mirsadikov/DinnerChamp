import axios from '../config/axios';
import { EMPLOYEE_LOGIN_FAIL, EMPLOYEE_LOGIN_SUCCESS, RESTAURANT_LOGIN_FAIL, RESTAURANT_LOGIN_SUCCESS } from '../constants';

export const login = (email, password) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {
      data: { id, token },
    } = await axios.post('/api/restaurant/login', { email, password, tablet: true }, config);

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

export const employeeLogin = (staffId, password) => async (dispatch, getState) => {
  try {
    const {
      restaurant: { token },
    } = getState();

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      },
    };

    const { data } = await axios.post('/api/employee/login', { staffId, password }, config);
    dispatch({
      type: EMPLOYEE_LOGIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EMPLOYEE_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
