import {
  ADD_CATEGORY_REQUEST,
  ADD_CATEGORY_SUCCESS,
  CATEGORIES_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  GET_CATEGORIES_REQUEST,
  GET_CATEGORIES_SUCCESS,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
} from '../constants';

export const categoriesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORIES_REQUEST:
      return { categories: state.categories, loading: true };
    case GET_CATEGORIES_SUCCESS:
      return { loading: false, categories: action.payload };
    case ADD_CATEGORY_REQUEST:
      return { ...state, addSuccess: null, addLoading: true };
    case ADD_CATEGORY_SUCCESS:
      return {
        categories: [...state.categories, action.payload],
        addLoading: false,
        addSuccess: true,
      };
    case CATEGORIES_FAIL:
      return { ...state, loading: false, addLoading: false, error: action.payload };
    case DELETE_CATEGORY_REQUEST:
      return { ...state, deleteSuccess: null, deleteLoading: true };
    case DELETE_CATEGORY_SUCCESS:
      return {
        categories: [...state.categories.filter((c) => c.id !== action.payload)],
        deleteLoading: false,
        deleteSuccess: true,
      };
    case UPDATE_CATEGORY_REQUEST:
      return { ...state, updateSuccess: null, updateLoading: true };
    case UPDATE_CATEGORY_SUCCESS:
      return {
        categories: [
          ...state.categories.map((c) => (c.id === action.payload.id ? action.payload : c)),
        ],
        updateLoading: false,
        updateSuccess: true,
      };
    default:
      return state;
  }
};
