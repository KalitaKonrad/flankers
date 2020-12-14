import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryCache, ReactQueryCacheProvider, setConsole } from 'react-query';

import { AuthProvider } from './src/hooks/useAuth';
import { AppScreen } from './src/screens/AppScreen';
import { theme } from './src/theme';

setConsole({
  log: console.log,
  warn: console.warn,
  error: console.warn,
});

const queryCache = new QueryCache();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <AppScreen />
          </NavigationContainer>
        </PaperProvider>
      </ReactQueryCacheProvider>
    </AuthProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d241f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
