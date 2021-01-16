import { StackScreenProps } from '@react-navigation/stack';
import React, { useMemo, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { ContainerWithAvatar } from '../../components/layout/ContainerWithAvatar';
import { MatchHistoryList } from '../../components/match/MatchHistoryList';
import { AppText } from '../../components/shared/AppText';
import { AvatarSelectButton } from '../../components/shared/AvatarSelectButton';
import { Switch } from '../../components/shared/Switch';
import { TeamMemberList } from '../../components/team/TeamMembersList';
import { useTeamProfileQuery } from '../../hooks/useTeamManageQuery';
import { useTeamMatchHistoryQuery } from '../../hooks/useTeamMatchHistoryQuery';
import { useTeamMembersQuery } from '../../hooks/useTeamMembersQuery';
import { useUpdateTeamAvatarMutation } from '../../hooks/useUpdateTeamAvatarMutation';
import { useUserMatchHistoryQuery } from '../../hooks/useUserMatchHistoryQuery';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { MatchElementInHistory } from '../../types/match';
import { TeamScreenStackParamList } from './TeamScreenStack';

type TeamManageScreenProps = StackScreenProps<
  TeamScreenStackParamList,
  'TeamManage'
>;

export const TeamManageScreen: React.FC<TeamManageScreenProps> = () => {
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
      {showMatches && (
        <MatchHistoryList
          matchHistory={matchHistoryList}
          onListEndReached={() => {
            if (matchHistory.hasNextPage) {
              matchHistory.fetchNextPage();
            }
          }}
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
