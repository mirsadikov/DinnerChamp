import axios from '../axiosConfig';
import {
  GET_STATISTICS_REQUEST,
  GET_STATISTICS_SUCCESS,
  GET_STATISTICS_FAIL,
} from '../constants.js';

export const getStatistics = (time) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_STATISTICS_REQUEST,
    });

    const { info } = getState().auth;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: info.token,
      },
    };

    // time as query param
    const { data } = await axios.get(`/api/restaurant/statistics?time=${time}`, config);

    dispatch({
      type: GET_STATISTICS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_STATISTICS_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
