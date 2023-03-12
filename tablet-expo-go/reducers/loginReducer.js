import { RESTAURANT_LOGIN_FAIL, RESTAURANT_LOGIN_SUCCESS, RESTAURANT_LOGOUT } from '../constants';

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTAURANT_LOGIN_SUCCESS:
      return { ...action.payload };
    case RESTAURANT_LOGIN_FAIL:
      return { error: action.payload };
    case RESTAURANT_LOGOUT:
      return {};
    default:
      return state;
  }
};
