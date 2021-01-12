import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Container } from '../../components/layout/Container';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { RankingList } from '../../components/ranking/RankingList';
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

  const [pagePlayerRanking, setPagePlayerRanking] = useState(1);
  const [pageTeamRanking, setPageTeamRanking] = useState(1);

  const profile = useUserProfileQuery();

  const {
    isLoading: isTeamLeaderboardsQueryLoading,
    isError: isTeamLeaderboardsQueryError,
    error: teamLeaderboardsError,
    data: teamLeaderboardsList,
    isFetching: isTeamLeaderboardsQueryFetching,
    isPreviousData: isPreviousTeamLeaderboardsData,
  } = useTeamLeaderboardsQuery(pageTeamRanking);

  const {
    isLoading: isPlayerLeaderboardsQueryLoading,
    isError: isPlayerLeaderboardsQueryError,
    error: playerLeaderboardsError,
    data: playerLeaderboardsList,
    isFetching: isPlayerLeaderboardsQueryFetching,
    isPreviousData: isPreviousPlayerLeaderboardsData,
  } = usePlayerLeaderboardsQuery(pagePlayerRanking);

  const onNextPagePlayerRanking = () => {
    const value = pagePlayerRanking + 1;
    if (
      !isPreviousPlayerLeaderboardsData &&
      playerLeaderboardsList?.next_page_url
    ) {
      setPagePlayerRanking(value);
    }
  };

  const onNextPageTeamRanking = () => {
    const value = pageTeamRanking + 1;
    if (
      !isPreviousTeamLeaderboardsData &&
      teamLeaderboardsList?.next_page_url
    ) {
      setPageTeamRanking(value);
    }
  };

  const onPreviousPagePlayerRanking = () => {
    let value = pagePlayerRanking - 1;
    if (value < 1) {
      value = 1;
    }
    setPagePlayerRanking(value);
  };

  const onPreviousPageTeamRanking = () => {
    let value = pageTeamRanking - 1;
    if (value < 1) {
      value = 1;
    }
    setPageTeamRanking(value);
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

      {isPlayerLeaderboardsQueryLoading ? (
        <Text>Loading...</Text>
      ) : isPlayerLeaderboardsQueryError ? (
        alert('Błąd podczas wyświetlania rankungu użytkowników')
      ) : showTeamsRanking ||
        playerLeaderboardsList === undefined ||
        profile.data?.id === undefined ? null : (
        <RankingList
          data={playerLeaderboardsList.data}
          pageNumber={pagePlayerRanking}
          userId={profile.data?.id}
          buttonGroup={
            <View style={styles.buttonGroup}>
              <AppButton
                onPress={onPreviousPagePlayerRanking}
                disabled={pagePlayerRanking === 1}>
                Wstecz
              </AppButton>
              <AppButton
                onPress={onNextPagePlayerRanking}
                disabled={
                  isPreviousPlayerLeaderboardsData ||
                  playerLeaderboardsList.next_page_url === null
                }>
                Naprzód
              </AppButton>
            </View>
          }
        />
      )}

      {isTeamLeaderboardsQueryLoading ? (
        <Text>Loading...</Text>
      ) : isTeamLeaderboardsQueryError ? (
        alert('Błąd podczas wyświetlania rankingu drużynowego')
      ) : !showTeamsRanking ||
        teamLeaderboardsList === undefined ||
        profile.data?.current_team_id === undefined ? null : (
        <RankingList
          data={teamLeaderboardsList.data}
          pageNumber={pageTeamRanking}
          userTeamId={profile.data.current_team_id}
          buttonGroup={
            <View style={styles.buttonGroup}>
              <AppButton
                onPress={onPreviousPageTeamRanking}
                disabled={pageTeamRanking === 1}>
                Wstecz
              </AppButton>
              <AppButton
                onPress={onNextPageTeamRanking}
                disabled={
                  isPreviousTeamLeaderboardsData ||
                  teamLeaderboardsList.next_page_url === null
                }>
                Naprzód
              </AppButton>
            </View>
          }
        />
      )}

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
