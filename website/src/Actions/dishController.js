import axios from '../axiosConfig';
import { GET_DISHES_FAIL, GET_DISHES_REQUEST, GET_DISHES_SUCCESS } from '../constants';

export const getAllDishes = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_DISHES_REQUEST,
    });

    const {
      info: { id },
    } = getState().auth;

    const { data } = await axios.get(`/api/dish/${id}/all`);

    dispatch({
      type: GET_DISHES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DISHES_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
