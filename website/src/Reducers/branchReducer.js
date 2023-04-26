import { getAllBranches } from '../Actions/branchActions';
import {
  RESTAURANT_LOGOUT,
  GET_BRANCH_REQUEST,
  GET_BRANCH_SUCCESS,
  BRANCHES_FAIL,
  BRANCHES_LOADING,
  ADD_BRANCH_REQUEST,
  UPDATE_BRANCH_REQUEST,
  ADD_BRANCH_SUCCESS,
  UPDATE_BRANCH_SUCCESS,
  BRANCH_FORM_FAIL,
  BRANCH_FORM_RESET,
  BRANCH_LIST_ADD,
  BRANCH_LIST_REMOVE,
} from '../constants';

export const branchesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_BRANCH_REQUEST:
      return { ...state, loading: true };
    case GET_BRANCH_SUCCESS:
      return { loading: false, branches: action.payload };
    case BRANCHES_FAIL:
      return { ...state, loading: false, error: action.payload };
    case BRANCH_LIST_ADD: {
      // if no branches in state, call getAllBranches
      if (!state.branches) {
        getAllBranches();
        return { ...state };
      }
      return { ...state, branches: [...state.branches, action.payload] };
    }
    case BRANCH_LIST_REMOVE:
      return {
        ...state,
        loading: false,
        branches: state.branches.filter((branch) => branch.id !== action.payload),
      };
    case BRANCHES_LOADING: {
      return { ...state, loading: true };
    }
    case RESTAURANT_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const branchFormReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_BRANCH_REQUEST:
    case UPDATE_BRANCH_REQUEST:
      return { ...state, loading: true, success: false };
    case ADD_BRANCH_SUCCESS:
    case UPDATE_BRANCH_SUCCESS:
      return { loading: false, success: true };
    case BRANCH_FORM_FAIL:
      return { error: action.payload };
    case BRANCH_FORM_RESET:
      return {};
    default:
      return state;
  }
};
