import {
  EMPLOYEE_LOGIN_FAIL,
  EMPLOYEE_LOGIN_SUCCESS,
  EMPLOYEE_LOGOUT,
  RESTAURANT_LOGIN_FAIL,
  RESTAURANT_LOGIN_SUCCESS,
  RESTAURANT_LOGOUT,
  RESET_ERRORS,
} from '../constants';

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTAURANT_LOGIN_SUCCESS:
      return { ...action.payload };
    case RESTAURANT_LOGIN_FAIL:
      return { error: action.payload };
    case RESTAURANT_LOGOUT:
      return {};
    case RESET_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export const employeeLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case EMPLOYEE_LOGIN_SUCCESS:
      return { ...action.payload };
    case EMPLOYEE_LOGIN_FAIL:
      return { error: action.payload };
    case EMPLOYEE_LOGOUT:
    case RESTAURANT_LOGOUT:
      return {};
    case RESET_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};
