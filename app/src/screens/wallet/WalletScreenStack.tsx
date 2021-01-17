import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { HeaderAppButton } from '../../components/shared/HeaderAppButton';
import { useNotificationHandler } from '../../hooks/useNotificationHandler';
import { WalletPaymentMethodScreen } from './WalletPaymentMethodScreen';
import { WalletScreen } from './WalletScreen';

export type WalletScreenStackParamList = {
  Wallet: undefined;
  PaymentMethod: undefined;
};

const Stack = createStackNavigator<WalletScreenStackParamList>();

export const WalletScreenStack: React.FC = ({ navigation }) => {
  const theme = useTheme();
  useNotificationHandler(navigation);

  return (
    <Stack.Navigator
      screenOptions={theme.whiteHeader}
      initialRouteName="Wallet">
      <Stack.Screen
        name="Wallet"
        component={WalletScreen}
        options={({ navigation }) => ({
          title: 'Portfel',
          headerRight: () => (
            <HeaderAppButton
              inverse
              onPress={() => navigation.navigate('PaymentMethod')}>
              Karta
            </HeaderAppButton>
          ),
        })}
      />
      <Stack.Screen
        name="PaymentMethod"
        component={WalletPaymentMethodScreen}
        options={{
          title: 'Metoda płatności',
        }}
      />
    </Stack.Navigator>
  );
};
