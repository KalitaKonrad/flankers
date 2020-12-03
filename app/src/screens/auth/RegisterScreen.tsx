import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';

import { AuthScreenStackParamList } from './AuthScreenStack';

type RegisterScreenProps = object &
  StackScreenProps<AuthScreenStackParamList, 'Register'>;

export const RegisterScreen: React.FC<RegisterScreenProps> = ({
  navigation,
}) => {
  return (
    <>
      <Text>Registration Page</Text>
    </>
  );
};
