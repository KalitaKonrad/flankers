import {
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import merge from 'deepmerge';
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
const CombinedDefaultTheme = merge(NavigationDefaultTheme, theme);

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
          <PaperProvider theme={CombinedDefaultTheme}>
            <NavigationContainer theme={CombinedDefaultTheme}>
              <AppScreen />
            </NavigationContainer>
          </PaperProvider>
        </ReactQueryCacheProvider>
      </AuthProvider>
    </NotificationProvider>
  );
};

export default App;
