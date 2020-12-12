import React, { createContext, useContext, useState } from 'react';

type AuthContextData = ReturnType<typeof useProvideAuth>;

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

  const login = () => {
    throw Error('Not implemented');
  };

  const logout = () => {
    throw Error('Not implemented');
  };

  return { isAuthenticated, login, logout };
};
