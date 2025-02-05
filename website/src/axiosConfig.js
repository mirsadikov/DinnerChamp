import axios from 'axios';
import { api_url } from './config';

const instance = axios.create(
  {
    baseURL: api_url,
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401 && error.response.data.message === 'Unauthorized') {
      localStorage.removeItem('restaurantInfo');
      window.location.reload();
    }
    return Promise.reject(error);
  },
);

export default instance;
