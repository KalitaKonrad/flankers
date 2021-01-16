import { StackScreenProps } from '@react-navigation/stack';
import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ContainerWithAvatar } from '../../components/layout/ContainerWithAvatar';
import { MatchHistoryList } from '../../components/match/MatchHistoryList';
import { AppText } from '../../components/shared/AppText';
import { AvatarSelectButton } from '../../components/shared/AvatarSelectButton';
import { Switch } from '../../components/shared/Switch';
import { TeamMemberList } from '../../components/team/TeamMembersList';
import { useTeamMatchHistoryQuery } from '../../hooks/useTeamMatchHistoryQuery';
import { useTeamMembersQuery } from '../../hooks/useTeamMembersQuery';
import { useUpdateTeamAvatarMutation } from '../../hooks/useUpdateTeamAvatarMutation';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { MatchElementInHistory } from '../../types/match';
import { ListPlaceholder } from '../../utils/ListPlaceholder';
import { TeamScreenStackParamList } from './TeamScreenStack';

type TeamManageScreenProps = StackScreenProps<
  TeamScreenStackParamList,
  'TeamManage'
>;

export const TeamManageScreen: React.FC<TeamManageScreenProps> = ({
  navigation,
}) => {
  const userProfile = useUserProfileQuery();
  const userTeam = userProfile?.data?.teams?.[0];
  const membersList = useTeamMembersQuery(userProfile.data?.current_team_id);
  const mutationTeamAvatar = useUpdateTeamAvatarMutation();
  const [showMatches, setShowMatches] = useState(false);
  const [avatar, setAvatar] = useState<string>(
    userProfile.data?.teams?.[0]?.versioned_avatar!
  );
  const matchHistory = useTeamMatchHistoryQuery({ page: 1 }, userTeam?.id);
  const matchHistoryList = useMemo(() => {
    if (
      ((matchHistory.isFetching || matchHistory.isError) &&
        !matchHistory.isFetchingNextPage) ||
      matchHistory.data?.pages === undefined
    ) {
      return [];
    }
    return matchHistory.data.pages.reduce((list, page) => {
      return [...list, ...page.data];
    }, [] as MatchElementInHistory[]);
  }, [matchHistory]);

  const changeAvatar = (avatarUri: string) => {
    if (userProfile.data?.current_team_id !== undefined) {
      setAvatar(avatarUri);
      mutationTeamAvatar.mutate({
        avatarUri,
        team_id: userProfile.data?.current_team_id,
      });
    }
  };

  const onMatchHistoryListEndReached = useCallback(() => {
    if (matchHistory.hasNextPage) {
      matchHistory.fetchNextPage();
    }
  }, [matchHistory]);

  const listView = useMemo(() => {
    const query = showMatches ? matchHistory : membersList;
    const view = showMatches ? (
      <MatchHistoryList
        matchHistory={matchHistoryList}
        onListEndReached={onMatchHistoryListEndReached}
      />
    ) : (
      <TeamMemberList members={membersList.data!} />
    );

    if (query.isLoading) {
      return <ListPlaceholder placeholderCount={6} />;
    }
    return view;
  }, [showMatches, matchHistory, membersList, onMatchHistoryListEndReached]);

  return (
    <ContainerWithAvatar
      avatar={{ uri: avatar }}
      isLoading={userProfile.isFetching}
      button={
        !avatar ? null : (
          <AvatarSelectButton
            avatarUri={avatar}
            onAvatarChange={(avatarUri) => changeAvatar(avatarUri)}
          />
        )
      }>
      <View style={styles.meta}>
        <AppText variant="h1">{userTeam?.name}</AppText>
        <AppText variant="h3">Punkty rankingowe: {userTeam?.elo}</AppText>
      </View>
      <View style={styles.switch}>
        <Switch
          leftLabel="Członkowie"
          rightLabel="Mecze"
          onSwitchToLeft={() => setShowMatches(false)}
          onSwitchToRight={() => setShowMatches(true)}
        />
      </View>
      {listView}
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
