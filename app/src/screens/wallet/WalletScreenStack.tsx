import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { theme } from '../../theme';
import { WalletScreen } from './WalletScreen';

export type WalletScreenStackParamList = {
  Wallet: undefined;
};

const Stack = createStackNavigator<WalletScreenStackParamList>();

export const WalletScreenStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={theme.headerOptions}>
      <Stack.Screen name="Wallet" component={WalletScreen} />
    </Stack.Navigator>
  );
};
