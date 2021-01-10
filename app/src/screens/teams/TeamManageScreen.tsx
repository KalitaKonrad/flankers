import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { ContainerWithAvatar } from '../../components/layout/ContainerWithAvatar';
import { MatchHistoryList } from '../../components/match/MatchHistoryList';
import { AppText } from '../../components/shared/AppText';
import { Switch } from '../../components/shared/Switch';
import { TeamMemberList } from '../../components/team/TeamMembersList';
import { useTeamMembersQuery } from '../../hooks/useTeamMembersQuery';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { ListPlaceholder } from '../../utils/listPlaceholder';
import { TeamScreenStackParamList } from './TeamScreenStack';

type TeamManageScreenProps = StackScreenProps<
  TeamScreenStackParamList,
  'TeamManage'
>;

export const TeamManageScreen: React.FC<TeamManageScreenProps> = () => {
  const userProfile = useUserProfileQuery();
  const membersList = useTeamMembersQuery(userProfile.data?.current_team_id);
  const [showMatches, setShowMatches] = useState(false);

  const matchesView = useMemo(() => {
    if (membersList.isFetching) {
      return <ListPlaceholder placeholderCount={4} />;
    }

    if (showMatches) {
      return <MatchHistoryList matchHistory={[]} />; // TODO: ADD LIST PLACEHOLDER WHEN MATCH HISTORY IS AVAILABLE
    }

    if (!showMatches && membersList.isSuccess) {
      return <TeamMemberList members={membersList.data!} />;
    }
  }, [
    membersList.data,
    membersList.isFetching,
    membersList.isSuccess,
    showMatches,
  ]);

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
      {matchesView}
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
