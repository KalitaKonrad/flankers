import * as SecureStore from 'expo-secure-store';

import axios from '../utils/axios';

const TOKEN_KEY = 'TOKEN';

export const register = (nick: string, email: string, password: string) => {
  return axios.post('auth/signup', {
    name: nick,
    email,
    password,
  });
};

export const login = (email: string, password: string) => {
  return axios.post('auth/signin', {
    email,
    password,
  });
};

export const setToken = (token: string) =>
  SecureStore.setItemAsync(TOKEN_KEY, token);

export const getToken = () => SecureStore.getItemAsync(TOKEN_KEY);

export const deleteToken = () => SecureStore.deleteItemAsync(TOKEN_KEY);
