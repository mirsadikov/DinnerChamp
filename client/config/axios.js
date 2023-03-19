import axios from 'axios';
import { api_url } from './variables';

const instance = axios.create({
  baseURL: api_url,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth');
    }
    return Promise.reject(
      error.response && error.response.data.message ? error.response.data.message : error.message
    );
  }
);

export default instance;
