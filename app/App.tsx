import { NavigationContainer } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryCache, ReactQueryCacheProvider, setConsole } from 'react-query';

import { AuthProvider } from './src/hooks/useAuth';
import { NotificationProvider } from './src/hooks/useNotification';
import { AppScreen } from './src/screens/AppScreen';
import { theme } from './src/theme';

setConsole({
  log: console.log,
  warn: console.warn,
  error: console.warn,
});

const queryCache = new QueryCache();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <AuthProvider>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <PaperProvider theme={theme}>
            <NavigationContainer>
              <AppScreen />
            </NavigationContainer>
          </PaperProvider>
        </ReactQueryCacheProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
