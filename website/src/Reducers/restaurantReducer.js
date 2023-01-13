import {
  GET_RESTAURANT_FAIL,
  GET_RESTAURANT_REQUEST,
  GET_RESTAURANT_SUCCESS,
  RESTAURANT_LOGIN_FAIL,
  RESTAURANT_LOGIN_REQUEST,
  RESTAURANT_LOGIN_SUCCESS,
  RESTAURANT_LOGOUT,
  RESTAURANT_REGISTER_FAIL,
  RESTAURANT_REGISTER_REQUEST,
  RESTAURANT_REGISTER_SUCCESS,
  UPDATE_RESTAURANT_IMAGE_REQUEST,
  UPDATE_RESTAURANT_IMAGE_SUCCESS,
  UPDATE_RESTAURANT_IMAGE_FAIL,
  RESTAURANT_UPDATE,
  UPDATE_IMAGE_RESET,
  UPDATE_RESTAURANT_REQUEST,
  UPDATE_RESTAURANT_SUCCESS,
  UPDATE_RESTAURANT_FAIL,
  UPDATE_RESTAURANT_RESET,
} from '../constants.js';

export const restaurantLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTAURANT_LOGIN_REQUEST:
      return { loading: true };
    case RESTAURANT_LOGIN_SUCCESS:
      return { loading: false, info: action.payload };
    case RESTAURANT_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case RESTAURANT_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const restaurantRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case RESTAURANT_REGISTER_REQUEST:
      return { loading: true };
    case RESTAURANT_REGISTER_SUCCESS:
      return { loading: false, success: action.payload };
    case RESTAURANT_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case RESTAURANT_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const getRestaurantReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_RESTAURANT_REQUEST:
      return { loading: true };
    case GET_RESTAURANT_SUCCESS:
      return { loading: false, info: action.payload };
    case GET_RESTAURANT_FAIL:
      return { loading: false, error: action.payload };
    case RESTAURANT_UPDATE:
      return { ...state, info: action.payload };
    case RESTAURANT_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const updateRestaurantImageReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_RESTAURANT_IMAGE_REQUEST:
      return { loading: true };
    case UPDATE_RESTAURANT_IMAGE_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_RESTAURANT_IMAGE_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_IMAGE_RESET:
      return {};
    case RESTAURANT_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const updateRestaurantDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_RESTAURANT_REQUEST:
      return { loading: true };
    case UPDATE_RESTAURANT_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_RESTAURANT_FAIL:
      return { loading: false, error: action.payload };
    case UPDATE_RESTAURANT_RESET:
      return {};
    case RESTAURANT_LOGOUT:
      return {};
    default:
      return state;
  }
};
