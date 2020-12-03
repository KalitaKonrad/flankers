import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';

import { AuthScreenStackParamList } from './AuthScreenStack';

type LoginPageProps = object &
  StackScreenProps<AuthScreenStackParamList, 'Login'>;

export const LoginScreen: React.FC<LoginPageProps> = ({ navigation }) => {
  return (
    <>
      <Text>Login Page</Text>
    </>
  );
};
