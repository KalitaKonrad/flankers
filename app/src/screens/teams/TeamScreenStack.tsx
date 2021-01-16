import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { HeaderAppButton } from '../../components/shared/HeaderAppButton';
import { useRemoveTeamMemberMutation } from '../../hooks/useRemoveTeamMemberMutation';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { TeamCreateScreen } from './TeamCreateScreen';
import { TeamInvitationScreen } from './TeamInvitationScreen';
import { TeamManageScreen } from './TeamManageScreen';

export type TeamScreenStackParamList = {
  TeamCreate: undefined;
  TeamManage: undefined;
  TeamInvitation: undefined;
};

const Stack = createStackNavigator<TeamScreenStackParamList>();

export const TeamScreenStack: React.FC = () => {
  const theme = useTheme();
  const userProfile = useUserProfileQuery();
  const hasTeam = userProfile?.data?.teams?.[0] !== undefined;
  const removeTeamMember = useRemoveTeamMemberMutation();

  const onLeaveTeamPress = async () => {
    if (!!userProfile.data?.id && !!userProfile.data?.current_team_id) {
      await removeTeamMember.mutateAsync({
        team_id: userProfile.data.current_team_id,
        user_id: userProfile.data.id,
      });
    }
  };

  return (
    <Stack.Navigator
      initialRouteName={hasTeam ? 'TeamManage' : 'TeamCreate'}
      screenOptions={theme.tallHeader}>
      <Stack.Screen
        name="TeamManage"
        component={TeamManageScreen}
        options={({ navigation }) => ({
          title: 'Zespół',
          headerLeft: () => (
            <HeaderAppButton
              onPress={() => navigation.navigate('TeamInvitation')}>
              Zaproś
            </HeaderAppButton>
          ),
          headerRight: () => (
            <HeaderAppButton
              onPress={async () => {
                await onLeaveTeamPress();
                navigation.navigate('TeamCreate');
              }}>
              Opuść
            </HeaderAppButton>
          ),
        })}
      />
      <Stack.Screen
        name="TeamCreate"
        component={TeamCreateScreen}
        options={{
          title: 'Utwórz zespół',
        }}
      />
      <Stack.Screen
        name="TeamInvitation"
        component={TeamInvitationScreen}
        options={{ title: 'Zaproś' }}
      />
    </Stack.Navigator>
  );
};
