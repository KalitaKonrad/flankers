import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Container } from '../../components/layout/Container';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { PlayersRanking } from '../../components/ranking/PlayersRanking';
import { TeamsRanking } from '../../components/ranking/TeamRanking';
import { AppButton } from '../../components/shared/AppButton';
import { Switch } from '../../components/shared/Switch';
import { usePlayerLeaderboardsQuery } from '../../hooks/usePlayerLeaderboardsQuery';
import { useTeamLeaderboardsQuery } from '../../hooks/useTeamLeaderboardsQuery';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { RankingScreenStackParamList } from './RankingScreenStack';

type RankingScreenProps = StackScreenProps<
  RankingScreenStackParamList,
  'Ranking'
>;

export const RankingScreen: React.FC<RankingScreenProps> = ({ navigation }) => {
  const [showTeamsRanking, setShowTeamsRanking] = useState(false);

  const [page, setPage] = useState(1);

  const profile = useUserProfileQuery();

  const {
    isLoading: isTeamLeaderboardsQueryLoading,
    isError: isTeamLeaderboardsQueryError,
    error: teamLeaderboardsError,
    data: teamLeaderboardsList,
    isFetching: isTeamLeaderboardsQueryFetching,
    isPreviousData: isPreviousTeamLeaderboardsData,
  } = useTeamLeaderboardsQuery(page);

  const {
    isLoading: isPlayerLeaderboardsQueryLoading,
    isError: isPlayerLeaderboardsQueryError,
    error: playerLeaderboardsError,
    data: playerLeaderboardsList,
    isFetching: isPlayerLeaderboardsQueryFetching,
    isPreviousData: isPreviousPlayerLeaderboardsData,
  } = usePlayerLeaderboardsQuery(page);

  const onNextPage = () => {
    const value = page + 1;
    if (showTeamsRanking) {
      if (
        !isPreviousTeamLeaderboardsData &&
        teamLeaderboardsList?.next_page_url
      ) {
        setPage(value);
      }
    } else if (!showTeamsRanking) {
      if (
        !isPreviousPlayerLeaderboardsData &&
        playerLeaderboardsList?.next_page_url
      ) {
        setPage(value);
      }
    }
  };

  const onPreviousPage = () => {
    let value = page - 1;
    if (value < 1) {
      value = 1;
    }
    setPage(value);
  };

  return (
    <Container>
      <View style={styles.switchContainer}>
        <Switch
          leftLabel="Gracze"
          rightLabel="Drużyny"
          onSwitchToLeft={() => setShowTeamsRanking(false)}
          onSwitchToRight={() => setShowTeamsRanking(true)}
        />
      </View>
      {isTeamLeaderboardsQueryLoading ? (
        <Text>Loading...</Text>
      ) : isTeamLeaderboardsQueryError ? (
        <Text>{teamLeaderboardsError.message}</Text>
      ) : !showTeamsRanking ||
        teamLeaderboardsList === undefined ||
        profile.data?.current_team_id === undefined ? null : (
        <TeamsRanking
          teams={teamLeaderboardsList.data}
          pageNumber={page}
          userTeamId={profile.data.current_team_id}
        />
      )}

      {isPlayerLeaderboardsQueryLoading ? (
        <Text>Loading...</Text>
      ) : isPlayerLeaderboardsQueryError ? (
        <Text>{playerLeaderboardsError.message}</Text>
      ) : showTeamsRanking ||
        playerLeaderboardsList === undefined ||
        profile.data?.id === undefined ? null : (
        <PlayersRanking
          players={playerLeaderboardsList.data}
          pageNumber={page}
          userId={profile.data?.id}
          onEndReached={onNextPage}
        />
      )}
      <View style={styles.buttonGroup}>
        <AppButton onPress={onPreviousPage} disabled={page === 1}>
          Wstecz
        </AppButton>
        <AppButton
          onPress={onNextPage}
          disabled={isPreviousPlayerLeaderboardsData}>
          Naprzód
        </AppButton>
      </View>
      {isTeamLeaderboardsQueryFetching || isPlayerLeaderboardsQueryFetching ? (
        <Text>Loading</Text>
      ) : null}
    </Container>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    paddingHorizontal: 16,
    marginVertical: 24,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
});
