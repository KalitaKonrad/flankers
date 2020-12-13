import { AxiosRequestConfig } from 'axios';

import { getToken } from './tokenUtils';

export const tokenInterceptor = async (config: AxiosRequestConfig) => {
  const token = await getToken();
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};
