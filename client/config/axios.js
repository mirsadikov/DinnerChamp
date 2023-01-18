import axios from 'axios';
import { api_url } from './variables';

const instance = axios.create(
  {
    baseURL: api_url,
  }
);

export default instance;
