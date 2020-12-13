import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import Constants from 'expo-constants';

import { refreshTokenInterceptor } from './refreshTokenInterceptor';
import tokenInterceptor from './tokenInterceptor';

const instance = axios.create({
  baseURL: Constants.manifest.extra.apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(tokenInterceptor);
createAuthRefreshInterceptor(instance, refreshTokenInterceptor);

export default instance;
