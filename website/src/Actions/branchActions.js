import axios from '../axiosConfig';
import {
  BRANCHES_FAIL,
  GET_BRANCH_REQUEST,
  GET_BRANCH_SUCCESS,
  ADD_BRANCH_REQUEST,
  ADD_BRANCH_SUCCESS,
  BRANCH_LIST_ADD,
  BRANCH_FORM_FAIL,
  UPDATE_BRANCH_REQUEST,
  UPDATE_BRANCH_SUCCESS,
  BRANCHES_LOADING,
  BRANCH_LIST_REMOVE,
} from '../constants';

export const getAllBranches = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_BRANCH_REQUEST,
    });

    const {
      info: { id },
    } = getState().auth;

    const { data } = await axios.get(`/api/branch/getAll/${id}`);

    dispatch({
      type: GET_BRANCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BRANCHES_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const createBranch = (branch) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_BRANCH_REQUEST,
    });

    const {
      info: { id, token },
    } = getState().auth;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    const { data } = await axios.post(`/api/branch/create/${id}`, branch, config);

    dispatch({
      type: ADD_BRANCH_SUCCESS,
    });

    dispatch({
      type: BRANCH_LIST_ADD,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BRANCH_FORM_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const deleteBranch = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: BRANCHES_LOADING,
    });
    const {
      info: { token },
    } = getState().auth;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    await axios.delete(`/api/branch/delete/${id}`, config);

    dispatch({
      type: BRANCH_LIST_REMOVE,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: BRANCHES_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const updateBranch = (id, branch) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_BRANCH_REQUEST,
    });

    const {
      info: { token },
    } = getState().auth;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    await axios.put(`/api/branch/update/${id}`, branch, config);

    dispatch({
      type: UPDATE_BRANCH_SUCCESS,
    });

    dispatch(getAllBranches());
  } catch (error) {
    dispatch({
      type: BRANCH_FORM_FAIL,
      payload:
        error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
