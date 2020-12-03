import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Button, Text } from 'react-native';

import { AuthScreenStackParamList } from './AuthScreenStack';

type PasswordResetScreenProps = object &
  StackScreenProps<AuthScreenStackParamList, 'PasswordReset'>;

export const PasswordResetScreen: React.FC<PasswordResetScreenProps> = ({
  navigation,
}) => {
  return (
    <>
      <Text>Password Reset</Text>
    </>
  );
};
