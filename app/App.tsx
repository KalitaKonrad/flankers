import {
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import merge from 'deepmerge';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryCache, ReactQueryCacheProvider, setConsole } from 'react-query';

import { AlertProvider } from './src/hooks/useAlert';
import { AuthProvider } from './src/hooks/useAuth';
import { EchoProvider } from './src/hooks/useEcho';
import { AppScreen } from './src/screens/AppScreen';
import { theme } from './src/theme';

setConsole({
  log: console.log,
  warn: console.warn,
  error: console.warn,
});

const queryCache = new QueryCache();
const CombinedDefaultTheme = merge(NavigationDefaultTheme, theme);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AlertProvider>
        <EchoProvider>
          <ReactQueryCacheProvider queryCache={queryCache}>
            <PaperProvider theme={CombinedDefaultTheme}>
              <NavigationContainer theme={CombinedDefaultTheme}>
                <AppScreen />
              </NavigationContainer>
            </PaperProvider>
          </ReactQueryCacheProvider>
        </EchoProvider>
      </AlertProvider>
    </AuthProvider>
  );
};

export default App;
