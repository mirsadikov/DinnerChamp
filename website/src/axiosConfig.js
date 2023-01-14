import axios from 'axios';

const instance = axios.create(
  {
    baseURL: process.env.REACT_APP_API_URL,
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
