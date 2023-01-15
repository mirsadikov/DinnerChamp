import {
  GET_DISHES_FAIL,
  GET_DISHES_REQUEST,
  GET_DISHES_SUCCESS,
  RESTAURANT_LOGOUT,
} from '../constants';

export const dishesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DISHES_REQUEST:
      return { ...state, loading: true };
    case GET_DISHES_SUCCESS:
      return { loading: false, dishes: action.payload };
    case GET_DISHES_FAIL:
      return { loading: false, error: action.payload };
    case RESTAURANT_LOGOUT:
      return {};
    default:
      return state;
  }
};
