import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { HeaderAppButton } from '../../components/shared/HeaderAppButton';
import { useNotificationHandler } from '../../hooks/notifications/useNotificationHandler';
import { useRemoveTeamMemberMutation } from '../../hooks/team/useRemoveTeamMemberMutation';
import { useUserProfileQuery } from '../../hooks/user/useUserProfileQuery';
import { BottomTabNavigationParamList } from '../AppScreenStack';
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

type TeamScreenStackProps = MaterialBottomTabScreenProps<
  BottomTabNavigationParamList,
  'Team'
>;

export const TeamScreenStack: React.FC<TeamScreenStackProps> = ({
  navigation,
  route,
}) => {
  const theme = useTheme();
  const userProfile = useUserProfileQuery();
  const hasTeam = userProfile?.data?.teams?.[0] !== undefined;
  const removeTeamMember = useRemoveTeamMemberMutation();
  useNotificationHandler(navigation);

  const onLeaveTeamPress = async () => {
    if (!!userProfile.data?.id && !!userProfile.data?.current_team_id) {
      try {
        await removeTeamMember.mutateAsync(
          {
            team_id: userProfile.data.current_team_id,
            user_id: userProfile.data.id,
          },
          {}
        );
      } catch (error) {
        if (error.response.status === 403) {
          alert('Jesteś ostatnim członkiem zespołu - nie możesz go opuścić');
        } else {
          alert(
            'Podczas opuszczania zespołu wystąpił błąd - spróbuj ponownie później'
          );
        }
      }
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
              onPress={() => navigation.navigate('TeamInviteMember')}>
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
              onPress={() => navigation.navigate('TeamInvitations')}>
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
              onPress={() =>
                navigation.navigate(hasTeam ? 'TeamManage' : 'TeamCreate')
              }>
              Cofnij
            </HeaderAppButton>
          ),
        })}
      />
    </Stack.Navigator>
  );
};
