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

    const offset = new Date().getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(offset / 60));
    const offsetMinutes = Math.abs(offset % 60);
    const offsetString = `${offset < 0 ? '+' : '-'}${offsetHours
      .toString()
      .padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`;

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: info.token,
      },
      params: {
        time: time,
        offset: offsetString,
      },
    };

    // time as query param
    const { data } = await axios.get(`/api/restaurant/statistics`, config);

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
