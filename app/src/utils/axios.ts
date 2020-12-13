import axios from 'axios';
import Constants from 'expo-constants';

import tokenInterceptor from './tokenInterceptor';

const instance = axios.create({
  baseURL: Constants.manifest.extra.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(tokenInterceptor);

export default instance;
