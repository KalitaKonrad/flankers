import axios from 'axios';
import Constants from 'expo-constants';

const instance = axios.create({
  baseURL: Constants.manifest.extra.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default instance;
