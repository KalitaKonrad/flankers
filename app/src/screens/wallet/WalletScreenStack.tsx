import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { HeaderAppButton } from '../../components/shared/HeaderAppButton';
import { WalletScreen } from './WalletScreen';

export type WalletScreenStackParamList = {
  Wallet: undefined;
};

const Stack = createStackNavigator<WalletScreenStackParamList>();

export const WalletScreenStack: React.FC = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator screenOptions={theme.whiteHeader}>
      <Stack.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          title: 'Portfel',
          headerRight: () => (
            <HeaderAppButton inverse onPress={() => alert('Not implemented')}>
              Wypłać
            </HeaderAppButton>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
