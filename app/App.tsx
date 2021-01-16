import {
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import merge from 'deepmerge';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';

import { AlertProvider } from './src/hooks/useAlert';
import { AuthProvider } from './src/hooks/useAuth';
import { EchoProvider } from './src/hooks/useEcho';
import { AppScreen } from './src/screens/AppScreen';
import { theme } from './src/theme';

setLogger({
  log: console.log,
  warn: console.warn,
  error: console.warn,
});

const queryClient = new QueryClient();
const CombinedDefaultTheme = merge(NavigationDefaultTheme, theme);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AlertProvider>
        <EchoProvider>
          <QueryClientProvider client={queryClient}>
            <PaperProvider theme={CombinedDefaultTheme}>
              <NavigationContainer theme={CombinedDefaultTheme}>
                <AppScreen />
              </NavigationContainer>
            </PaperProvider>
          </QueryClientProvider>
        </EchoProvider>
      </AlertProvider>
    </AuthProvider>
  );
};

export default App;
