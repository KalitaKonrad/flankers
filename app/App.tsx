import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import { BottomTabNavigation } from './src/components/BottomTabNavigation';

const App: React.FC = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
    </PaperProvider>
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
