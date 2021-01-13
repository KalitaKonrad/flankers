import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Container } from '../../components/layout/Container';
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

  const teamLeaderboardsQuery = useTeamLeaderboardsQuery(pageTeamRanking);

  const playerLeaderboardsQuery = usePlayerLeaderboardsQuery(pagePlayerRanking);

  const onNextPagePlayerRanking = () => {
    if (
      !playerLeaderboardsQuery.isPreviousData &&
      playerLeaderboardsQuery.data?.next_page_url
    ) {
      setPagePlayerRanking(pagePlayerRanking + 1);
    }
  };

  const onNextPageTeamRanking = () => {
    if (
      !teamLeaderboardsQuery.isPreviousData &&
      teamLeaderboardsQuery.data?.next_page_url
    ) {
      setPageTeamRanking(pageTeamRanking + 1);
    }
  };

  const onPreviousPagePlayerRanking = () => {
    const value = Math.max(1, pagePlayerRanking - 1);
    setPagePlayerRanking(value);
  };

  const onPreviousPageTeamRanking = () => {
    const value = Math.max(1, pageTeamRanking - 1);
    setPageTeamRanking(value);
  };

  if (playerLeaderboardsQuery.isError || teamLeaderboardsQuery.isError) {
    alert('Błąd podczas wyświetlania rankingu');
    return null;
  }

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

      {playerLeaderboardsQuery.isLoading ? (
        <Text>Loading...</Text>
      ) : playerLeaderboardsQuery.isError ? (
        alert('Błąd podczas wyświetlania rankungu użytkowników')
      ) : showTeamsRanking ||
        playerLeaderboardsQuery.data === undefined ||
        profile.data?.id === undefined ? null : (
        <RankingList
          data={playerLeaderboardsQuery.data.data}
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
                  playerLeaderboardsQuery.isPreviousData ||
                  playerLeaderboardsQuery.data.next_page_url === null
                }>
                Naprzód
              </AppButton>
            </View>
          }
        />
      )}

      {teamLeaderboardsQuery.isLoading ? (
        <Text>Loading...</Text>
      ) : teamLeaderboardsQuery.error ? (
        alert('Błąd podczas wyświetlania rankingu drużynowego')
      ) : !showTeamsRanking ||
        teamLeaderboardsQuery.data === undefined ||
        profile.data?.current_team_id === undefined ? null : (
        <RankingList
          data={teamLeaderboardsQuery.data.data}
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
                  teamLeaderboardsQuery.isPreviousData ||
                  teamLeaderboardsQuery.data.next_page_url === null
                }>
                Naprzód
              </AppButton>
            </View>
          }
        />
      )}

      {teamLeaderboardsQuery.isFetching ||
      playerLeaderboardsQuery.isFetching ? (
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
