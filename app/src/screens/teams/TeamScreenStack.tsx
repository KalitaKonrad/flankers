import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { HeaderAppButton } from '../../components/shared/HeaderAppButton';
import { useRemoveTeamMemberMutation } from '../../hooks/useRemoveTeamMemberMutation';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { TeamCreateScreen } from './TeamCreateScreen';
import { TeamInvitationsScreen } from './TeamInvitationsScreen';
import { TeamInviteMemberScreen } from './TeamInviteMemberScreen';
import { TeamManageScreen } from './TeamManageScreen';

export type TeamScreenStackParamList = {
  TeamCreate: undefined;
  TeamManage: undefined;
  TeamInviteMember: undefined;
  TeamInvitations: undefined;
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

  // TODO: notifications on click not working (!!!!!!!!!!!!!!!!!)
  // TODO: add useNotificationHandler AT ALL SCREENS
  return (
    <Stack.Navigator
      // initialRouteName={hasTeam ? 'TeamManage' : 'TeamCreate'}
      //TODO: swap this out for avove routing when done with testing
      initialRouteName="TeamInvitations"
      // TODO: MAKE HEADER BIGGER/TALLER - SAME AS ON OTHER SCREENS
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
        name="TeamInviteMember"
        component={TeamInviteMemberScreen}
        options={{ title: 'Zaproś' }}
      />
      <Stack.Screen
        name="TeamInvitations"
        component={TeamInvitationsScreen}
        options={{ title: 'Zaproszenia' }}
      />
    </Stack.Navigator>
  );
};
