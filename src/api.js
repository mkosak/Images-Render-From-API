import axios from 'axios';
import CONFIG from './config';

const API = axios.create({
  baseURL: CONFIG.API_URL,
  params: {
    apikey: CONFIG.API_KEY,
    type: 'movie'
  }
});

export default API; 
