import { AxiosRequestConfig } from 'axios';

import { getToken } from '../services/AuthService';

const tokenInterceptor = async (config: AxiosRequestConfig) => {
  const token = await getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

export default tokenInterceptor;
