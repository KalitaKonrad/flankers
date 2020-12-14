import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { get } from 'react-hook-form';
import { useQuery } from 'react-query';

import { QUERY_PROFILE_KEY } from '../../const/query.const';
import { useUserProfile } from '../../hooks/useUserProfile';
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
  const userInfo = useUserProfile();
  console.log('=====================> ' + userInfo.data);
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
