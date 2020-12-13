import { AxiosRequestConfig } from 'axios';

import { getToken } from './tokenUtils';

const tokenInterceptor = async (config: AxiosRequestConfig) => {
  const token = await getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

export default tokenInterceptor;
