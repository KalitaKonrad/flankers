import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { HeaderAppButton } from '../../components/shared/HeaderAppButton';
import { useNotificationHandler } from '../../hooks/useNotificationHandler';
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

export const TeamScreenStack: React.FC = ({ navigation, route }) => {
  const theme = useTheme();
  const userProfile = useUserProfileQuery();
  const hasTeam = userProfile?.data?.teams?.[0] !== undefined;
  const removeTeamMember = useRemoveTeamMemberMutation();
  useNotificationHandler(navigation);

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
        options={({ navigation }) => ({
          title: 'Utwórz zespół',
          headerRight: () => (
            <HeaderAppButton
              onPress={async () => {
                await onLeaveTeamPress();
                navigation.push('TeamInvitations');
              }}>
              Zaproszenia
            </HeaderAppButton>
          ),
        })}
      />
      <Stack.Screen
        name="TeamInviteMember"
        component={TeamInviteMemberScreen}
        options={{ title: 'Zaproś' }}
      />
      <Stack.Screen
        name="TeamInvitations"
        component={TeamInvitationsScreen}
        options={({ navigation }) => ({
          title: 'Zaproszenia',
          headerLeft: () => (
            <HeaderAppButton
              onPress={() => {
                navigation.navigate(hasTeam ? 'TeamManage' : 'TeamCreate');
              }}>
              Cofnij
            </HeaderAppButton>
          ),
        })}
      />
    </Stack.Navigator>
  );
};
