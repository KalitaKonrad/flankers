import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { theme } from '../../theme';
import { ProfileEditScreen } from './ProfileEditScreen';
import { ProfileScreen } from './ProfileScreen';

export type ProfileScreenStackParamList = {
  Profile: undefined;
  ProfileEdit: undefined;
};

const Stack = createStackNavigator<ProfileScreenStackParamList>();

export const ProfileScreenStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={theme.headerOptions}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
    </Stack.Navigator>
  );
};
