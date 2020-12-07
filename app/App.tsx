import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
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

export default App;
