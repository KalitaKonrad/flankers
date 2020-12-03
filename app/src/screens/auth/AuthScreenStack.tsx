import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { theme } from '../../theme';
import { LoginScreen } from './LoginScreen';
import { PasswordResetConfirmScreen } from './PasswordResetConfirmScreen';
import { PasswordResetScreen } from './PasswordResetScreen';
import { RegisterScreen } from './RegisterScreen';

export type AuthScreenStackParamList = {
  Login: undefined;
  Register: undefined;
  PasswordReset: undefined;
  PasswordResetConfirm: undefined;
};

const Stack = createStackNavigator<AuthScreenStackParamList>();

export const AuthScreenStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={theme.headerOptions}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
      <Stack.Screen
        name="PasswordResetConfirm"
        component={PasswordResetConfirmScreen}
      />
    </Stack.Navigator>
  );
};
