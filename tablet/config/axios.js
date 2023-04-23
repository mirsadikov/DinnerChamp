import axios from 'axios';

import { store } from './store';
import { api_url } from './variables';
import { EMPLOYEE_LOGOUT } from '../constants';

const instance = axios.create({
  baseURL: api_url,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401 && error.response?.data.message === 'Unauthorized') {
      store.dispatch({ type: EMPLOYEE_LOGOUT });
    }
    return Promise.reject(error);
  }
);

export default instance;
