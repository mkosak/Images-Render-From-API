import axios from 'axios';
import CONFIG from './config';

const API = {
  LIST: axios.create({
    baseURL: CONFIG.API_URL
  }),
  IMAGE: axios.create({
    baseURL: CONFIG.API_URL,
    responseType: 'arraybuffer'
  })
};

export default API; 
