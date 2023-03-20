import { getAllEmployees } from '../Actions/employeeActions';
import {
  GET_EMPLOYEES_REQUEST,
  GET_EMPLOYEES_SUCCESS,
  EMPLOYEES_FAIL,
  RESTAURANT_LOGOUT,
  ADD_EMPLOYEE_REQUEST,
  UPDATE_EMPLOYEE_REQUEST,
  ADD_EMPLOYEE_SUCCESS,
  UPDATE_EMPLOYEE_SUCCESS,
  EMPLOYEE_FORM_FAIL,
  EMPLOYEE_FORM_RESET,
  EMPLOYEE_LIST_ADD,
  EMPLOYEES_LOADING,
  EMPLOYEE_LIST_REMOVE,
} from '../constants.js';

export const employeesReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EMPLOYEES_REQUEST:
      return { ...state, loading: true };
    case GET_EMPLOYEES_SUCCESS:
      return { loading: false, employees: action.payload };
    case EMPLOYEES_FAIL:
      return { loading: false, error: action.payload };
    case EMPLOYEES_LOADING: {
      return { ...state, loading: true };
    }
    case EMPLOYEE_LIST_ADD: {
      // if no employees in state, call getAllEmployees
      if (!state.employees) {
        getAllEmployees();
        return { ...state };
      }
      return { ...state, employees: [...state.employees, action.payload] };
    }
    case EMPLOYEE_LIST_REMOVE:
      return {
        ...state,
        loading: false,
        employees: state.employees.filter((emp) => emp.id !== action.payload),
      };
    case RESTAURANT_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const EmployeeFormReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_EMPLOYEE_REQUEST:
    case UPDATE_EMPLOYEE_REQUEST:
      return { ...state, loading: true, success: false };
    case ADD_EMPLOYEE_SUCCESS:
    case UPDATE_EMPLOYEE_SUCCESS:
      return { loading: false, success: true };
    case EMPLOYEE_FORM_FAIL:
      return { error: action.payload };
    case EMPLOYEE_FORM_RESET:
      return {};
    default:
      return state;
  }
};
