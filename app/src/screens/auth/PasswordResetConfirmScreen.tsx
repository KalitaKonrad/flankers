import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';

import { AuthScreenStackParamList } from './AuthScreenStack';

type PasswordResetConfirmScreen = object &
  StackScreenProps<AuthScreenStackParamList, 'PasswordResetConfirm'>;

export const PasswordResetConfirmScreen: React.FC<PasswordResetConfirmScreen> = ({
  navigation,
}) => {
  return (
    <>
      <Text>Password Reset New Password Page</Text>
    </>
  );
};
