import axios from 'axios';
import { mainDomain } from './Urls';

const instance = axios.create({
  baseURL: mainDomain,
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  },
  timeout: 50000
});

export default instance;
