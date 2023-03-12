import axios from 'axios';
import { RESTAURANT_LOGOUT } from '../constants';
import { api_url } from './variables';
import { store } from './store';

const instance = axios.create({
  baseURL: api_url,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 && error.response.data.message === 'Unauthorized') {
      store.dispatch({ type: RESTAURANT_LOGOUT });
    }
    return Promise.reject(error);
  }
);

export default instance;
