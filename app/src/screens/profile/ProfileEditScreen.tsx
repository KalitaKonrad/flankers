import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';

import { ProfileScreenStackParamList } from './ProfileScreenStack';

type ProfileEditScreenProps = object &
  StackScreenProps<ProfileScreenStackParamList, 'ProfileEdit'>;

export const ProfileEditScreen: React.FC<ProfileEditScreenProps> = ({
  navigation,
}) => {
  const onEdit = () => {
    navigation.push('Profile');
  };

  return (
    <>
      <Text>Create Team Page</Text>
    </>
  );
};
