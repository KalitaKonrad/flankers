import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';
import { Button } from 'react-native-paper';

import { AppButton } from '../../components/shared/AppButton';
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
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: { elevation: 0 },
        headerRightContainerStyle: { paddingRight: 16 },
      }}>
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={({ navigation }) => ({
          title: 'Rejestracja',
          headerRight: () => (
            <AppButton
              compact
              labelStyle={{ fontSize: 14 }}
              onPress={() => navigation.navigate('Login')}>
              Zaloguj
            </AppButton>
          ),
        })}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
      <Stack.Screen
        name="PasswordResetConfirm"
        component={PasswordResetConfirmScreen}
      />
    </Stack.Navigator>
  );
};
