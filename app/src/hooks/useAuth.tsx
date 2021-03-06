import React, { createContext, useContext, useEffect, useState } from 'react';

import { TOKEN_CHANGED_EVENT } from '../const/events.const';
import axios from '../utils/axios';
import { EventBus } from '../utils/eventBus';
import {
  deleteToken as deleteStoredToken,
  getToken as getStoredToken,
  setToken as setStoredToken,
} from '../utils/tokenUtils';
import { useNotification } from './notifications/useNotification';

type AuthContextData = ReturnType<typeof useProvideAuth>;

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider: React.FC = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useProvideAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(true);
  const isAuthenticated = token !== null;
  const { unsubscribeFromExpoNotifications } = useNotification();

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
    await setStoredToken(token);
  };

  const logout = async () => {
    await axios.post('auth/signout');
    await unsubscribeFromExpoNotifications();
    await deleteStoredToken();
  };

  const initiatePasswordReset = (email: string) => {
    return axios.post('auth/forgot-password', {
      email,
    });
  };

  const resetPassword = (
    email: string,
    token: string,
    password: string,
    passwordConfirmation: string
  ) => {
    return axios.post('auth/reset-password', {
      token,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
  };

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = await getStoredToken();
      setToken(storedToken);
      setLoading(false);
    };
    initAuth();
  }, []);

  useEffect(() => {
    const unsubscribe = EventBus.on(TOKEN_CHANGED_EVENT, async () => {
      const newToken = await getStoredToken();
      setToken(newToken);

      // if token was deleted remove expoPushToken from backend
      if (!newToken) {
        await unsubscribeFromExpoNotifications();
      }
    });
    return () => {
      unsubscribe();
    };
  }, [unsubscribeFromExpoNotifications]);

  return {
    isLoading,
    isAuthenticated,
    register,
    login,
    logout,
    initiatePasswordReset,
    resetPassword,
    token,
  };
};
