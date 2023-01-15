import { getAllDishes } from '../Actions/dishActions';
import {
  ADD_DISH_REQUEST,
  ADD_DISH_SUCCESS,
  DISH_FORM_FAIL,
  DISH_LIST_ADD,
  DISH_LIST_REMOVE,
  DISHES_FAIL,
  GET_DISHES_REQUEST,
  GET_DISHES_SUCCESS,
  RESTAURANT_LOGOUT,
  DISHES_LOADING,
  DISH_FORM_RESET,
} from '../constants';

export const dishesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_DISHES_REQUEST:
      return { ...state, loading: true };
    case GET_DISHES_SUCCESS:
      return { loading: false, dishes: action.payload };
    case DISHES_FAIL:
      return { ...state, loading: false, error: action.payload };
    case DISH_LIST_ADD: {
      // if no dishes in state, call getAllDishes
      if (!state.dishes) {
        getAllDishes();
        return { ...state };
      }
      return { ...state, dishes: [...state.dishes, action.payload] };
    }
    case DISH_LIST_REMOVE:
      return {
        ...state,
        loading: false,
        dishes: state.dishes.filter((dish) => dish.id !== action.payload),
      };
    case DISHES_LOADING: {
      return { ...state, loading: true };
    }
    case RESTAURANT_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const dishFormReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_DISH_REQUEST:
      return { ...state, loading: true, success: false };
    case ADD_DISH_SUCCESS:
      return { loading: false, success: true };
    case DISH_FORM_FAIL:
      return { error: action.payload };
    case DISH_FORM_RESET:
      return {};
    default:
      return state;
  }
};
