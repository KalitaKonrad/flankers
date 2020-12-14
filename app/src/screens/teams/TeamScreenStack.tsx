import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text } from 'react-native';

import { useUserProfileQuery } from '../../hooks/useUserProfile';
import { theme } from '../../theme';
import { TeamCreateScreen } from './TeamCreateScreen';
import { TeamInvitationScreen } from './TeamIinvitationScreen';
import { TeamLoadingScreen } from './TeamLoadingScreen';
import { TeamManageScreen } from './TeamManageScreen';

export type TeamScreenStackParamList = {
  TeamCreate: undefined;
  TeamManage: undefined;
  TeamInvitation: undefined;
  TeamLoading: undefined;
};

const Stack = createStackNavigator<TeamScreenStackParamList>();

export const TeamScreenStack: React.FC = () => {
  const userInfo = useUserProfileQuery();
  return (
    <Stack.Navigator screenOptions={theme.headerOptions}>
      {userInfo.data?.teams?.length === 0 ? (
        <Stack.Screen name="TeamCreate" component={TeamCreateScreen} />
      ) : (
        <Stack.Screen name="TeamLoading" component={TeamLoadingScreen} />
      )}
      <Stack.Screen name="TeamManage" component={TeamManageScreen} />
      <Stack.Screen name="TeamInvitation" component={TeamInvitationScreen} />
    </Stack.Navigator>
  );
};
