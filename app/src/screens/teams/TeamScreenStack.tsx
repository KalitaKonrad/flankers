import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { useUserProfileQuery } from '../../hooks/useUserProfile';
import { theme } from '../../theme';
import { TeamCreateScreen } from './TeamCreateScreen';
import { TeamInvitationScreen } from './TeamIinvitationScreen';
import { TeamManageScreen } from './TeamManageScreen';

export type TeamScreenStackParamList = {
  TeamCreate: undefined;
  TeamManage: undefined;
  TeamInvitation: undefined;
};

const Stack = createStackNavigator<TeamScreenStackParamList>();

export const TeamScreenStack: React.FC = () => {
  const userInfo = useUserProfileQuery();
  return (
    <Stack.Navigator screenOptions={theme.headerOptions}>
      {userInfo.data?.teams !== undefined &&
      userInfo.data.teams.length === 0 ? (
        <Stack.Screen name="TeamCreate" component={TeamCreateScreen} />
      ) : (
        <Stack.Screen name="TeamManage" component={TeamManageScreen} />
      )}
      <Stack.Screen name="TeamInvitation" component={TeamInvitationScreen} />
    </Stack.Navigator>
  );
};
