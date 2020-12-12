import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { BottomTabNavigation } from './src/components/BottomTabNavigation';
import { AuthProvider } from './src/hooks/useAuth';
import { theme } from './src/theme';

declare global {
  namespace ReactNativePaper {
    interface ThemeColors {
      lightGray: string;
      darkGray: string;
      white: string;
      black: string;
    }

    interface Theme {
      headerOptions: {
        title: string;
        headerStyle: {
          backgroundColor: string;
          height: number;
          elevation: number;
        };
        headerTintColor: string;
      };
    }
  }
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <BottomTabNavigation />
        </NavigationContainer>
      </PaperProvider>
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
