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
    return Promise.reject(
      error.response && error.response.data.message ? error.response.data.message : error.message,
    );
  },
);

export default instance;
