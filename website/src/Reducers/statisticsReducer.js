import {
  GET_STATISTICS_REQUEST,
  GET_STATISTICS_SUCCESS,
  GET_STATISTICS_FAIL,
  RESTAURANT_LOGOUT,
} from '../constants';

export const statisticsReducer = (state = { info: null }, action) => {
  switch (action.type) {
    case GET_STATISTICS_REQUEST:
      return { ...state, loading: true };
    case GET_STATISTICS_SUCCESS:
      return { loading: false, info: action.payload };
    case GET_STATISTICS_FAIL:
      return { loading: false, error: action.payload };
    case RESTAURANT_LOGOUT:
      return {};
    default:
      return state;
  }
};
