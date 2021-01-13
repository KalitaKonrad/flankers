import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { ContainerWithAvatar } from '../../components/layout/ContainerWithAvatar';
import { MatchHistoryList } from '../../components/match/MatchHistoryList';
import { AppText } from '../../components/shared/AppText';
import { AvatarButton } from '../../components/shared/AvatarButton';
import { Switch } from '../../components/shared/Switch';
import { TeamMemberList } from '../../components/team/TeamMembersList';
import { useTeamMembersQuery } from '../../hooks/useTeamMembersQuery';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { TeamScreenStackParamList } from './TeamScreenStack';

type TeamManageScreenProps = StackScreenProps<
  TeamScreenStackParamList,
  'TeamManage'
>;

export const TeamManageScreen: React.FC<TeamManageScreenProps> = () => {
  const userProfile = useUserProfileQuery();
  const membersList = useTeamMembersQuery(userProfile.data?.current_team_id);
  const [showMatches, setShowMatches] = useState(false);
  const [avatar, setAvatar] = useState<string | undefined>(
    userProfile.data?.teams[0].versioned_avatar
  );

  const theme = useTheme();

  return (
    <ContainerWithAvatar avatar={{ uri: avatar }}>
      {avatar !== undefined && (
        <View style={styles.avatarBtnWrapper}>
          <AvatarButton
            avatarUri={avatar}
            onAvatarChange={(avatarUri) => setAvatar(avatarUri)}
            isTeamAvatar
            teamId={userProfile.data?.current_team_id}
          />
        </View>
      )}
      <View style={styles.meta}>
        <AppText variant="h1">{userProfile.data?.teams?.[0]?.name}</AppText>
        <AppText variant="h3">Punkty rankingowe: 1000</AppText>
      </View>
      <View style={styles.switch}>
        <Switch
          leftLabel="Członkowie"
          rightLabel="Mecze"
          onSwitchToLeft={() => setShowMatches(false)}
          onSwitchToRight={() => setShowMatches(true)}
        />
      </View>
      {showMatches && <MatchHistoryList matchHistory={[]} />}
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
