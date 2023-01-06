import axios from 'axios';

const instance = axios.create();

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
