import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ContainerWithAvatar } from '../../components/layout/ContainerWithAvatar';
import { AppText } from '../../components/shared/AppText';
import { MatchHistoryList } from '../../components/shared/MatchHistoryList';
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

  return (
    <ContainerWithAvatar avatar={require('../../../assets/avatar.png')}>
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
});
