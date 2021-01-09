import Constants from 'expo-constants';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js/react-native';
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useAuth } from './useAuth';

// @ts-ignore
window.Pusher = Pusher;

type EchoContextData = ReturnType<typeof useProvideEcho>;

const EchoContext = createContext<EchoContextData>({} as EchoContextData);

export const EchoProvider: React.FC = ({ children }) => {
  const value = useProvideEcho();
  return <EchoContext.Provider value={value}>{children}</EchoContext.Provider>;
};

const createEchoClient = (token: string) => {
  return new Echo({
    broadcaster: 'pusher',
    key: Constants.manifest.extra.webSocket.pusherKey,
    cluster: Constants.manifest.extra.webSocket.pusherCluster,
    wsHost: Constants.manifest.extra.webSocket.host,
    wsPort: Constants.manifest.extra.webSocket.port,
    forceTLS: false,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
};

const useProvideEcho = () => {
  const { token } = useAuth();
  const [isReady, setReady] = useState(false);
  const echo = useRef<Echo | null>(null);

  useEffect(() => {
    if (token !== null && echo.current === null) {
      echo.current = createEchoClient(token);
    } else {
      if (echo.current !== null) {
        echo.current.disconnect();
      }
      echo.current = null;
    }
    setReady(echo.current !== null);
  }, [token]);

  return { isReady, echo: echo.current };
};

export const useEcho = () => {
  return useContext(EchoContext);
};
