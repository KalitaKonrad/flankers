import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { ContainerWithAvatar } from '../../components/layout/ContainerWithAvatar';
import { MatchHistoryList } from '../../components/match/MatchHistoryList';
import { AppText } from '../../components/shared/AppText';
import { AvatarSelectButton } from '../../components/shared/AvatarSelectButton';
import { Switch } from '../../components/shared/Switch';
import { TeamMemberList } from '../../components/team/TeamMembersList';
import { useTeamMembersQuery } from '../../hooks/useTeamMembersQuery';
import { useUpdateTeamAvatarMutation } from '../../hooks/useUpdateTeamAvatarMutation';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { TeamScreenStackParamList } from './TeamScreenStack';

type TeamManageScreenProps = StackScreenProps<
  TeamScreenStackParamList,
  'TeamManage'
>;

export const TeamManageScreen: React.FC<TeamManageScreenProps> = () => {
  const userProfile = useUserProfileQuery();
  const membersList = useTeamMembersQuery(userProfile.data?.current_team_id);
  const [mutateTeamAvatar, mutationTeamAvatar] = useUpdateTeamAvatarMutation();

  const [showMatches, setShowMatches] = useState(false);
  const [avatar, setAvatar] = useState<string>(
    userProfile.data?.teams[0].versioned_avatar!
  );

  const theme = useTheme();

  const changeAvatar = (avatarUri: string) => {
    if (userProfile.data?.current_team_id !== undefined) {
      setAvatar(avatarUri);
      mutateTeamAvatar({
        avatarUri,
        team_id: userProfile.data?.current_team_id,
      });
    }
  };
  return (
    <ContainerWithAvatar avatar={{ uri: avatar }}>
      {avatar !== undefined && (
        <View style={styles.avatarBtnWrapper}>
          <AvatarSelectButton
            avatarUri={avatar}
            onAvatarChange={(avatarUri) => changeAvatar(avatarUri)}
          />
        </View>
      )}
      <View style={styles.meta}>
        <AppText variant="h1">{userProfile.data?.teams?.[0]?.name}</AppText>
        <AppText variant="h3">
          Punkty rankingowe: {userProfile.data?.teams[0].elo}
        </AppText>
      </View>
      <View style={styles.switch}>
        <Switch
          leftLabel="Członkowie"
          rightLabel="Mecze"
          onSwitchToLeft={() => setShowMatches(false)}
          onSwitchToRight={() => setShowMatches(true)}
        />
      </View>
      {showMatches && (
        <MatchHistoryList
          matchHistory={[]}
          onListEnd={() => console.log('end')}
        />
      )}
      {!showMatches && membersList.isSuccess && (
        <TeamMemberList members={membersList.data!} />
      )}
    </ContainerWithAvatar>
  );
};

const styles = StyleSheet.create({
  meta: {
    alignItems: 'center',
    marginBottom: 24,
  },
  switch: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  avatarBtnWrapper: {
    left: 200,
    top: -60,
  },
});
