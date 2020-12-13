import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useState } from 'react';

import { login } from '../services/AuthService';
import axios from '../utils/axios';
import { setResponseErrors } from '../utils/setResponseErrors';

type AuthContextData = ReturnType<typeof useProvideAuth>;
const TOKEN_KEY = 'TOKEN';

// @ts-ignore
const AuthContext = createContext<AuthContextData>();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProvideAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const isAuthenticated = token !== null;

  const register = async (nick: string, email: string, password: string) => {
    return axios.post('auth/signup', {
      name: nick,
      email,
      password,
    });
  };

  const login = async (email: string, password: string) => {
    const response = await axios.post('auth/signin', {
      email,
      password,
    });
    const token = response.data.access_token;
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    setToken(token);
  };

  const logout = async () => {
    await axios.post('auth/signout');
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    setToken(null);
  };

  return { isAuthenticated, register, login, logout };
};
