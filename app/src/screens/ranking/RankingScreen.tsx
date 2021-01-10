import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Container } from '../../components/layout/Container';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { PlayersRanking } from '../../components/ranking/PlayersRanking';
import { TeamsRanking } from '../../components/ranking/TeamRanking';
import { AppButton } from '../../components/shared/AppButton';
import { Switch } from '../../components/shared/Switch';
import { usePlayerLeaderboardsQuery } from '../../hooks/usePlayerLeaderboardsQuery';
import { useTeamLeaderboardsQuery } from '../../hooks/useTeamLeaderboardsQuery';
import { RankingScreenStackParamList } from './RankingScreenStack';

type RankingScreenProps = StackScreenProps<
  RankingScreenStackParamList,
  'Ranking'
>;

export const RankingScreen: React.FC<RankingScreenProps> = ({ navigation }) => {
  const [showTeamsRanking, setShowTeamsRanking] = useState(false);

  const [page, setPage] = useState(1);
  console.log('=======================>', page);
  const playersList = usePlayerLeaderboardsQuery(page);
  console.log(playersList.data);
  const teamList = useTeamLeaderboardsQuery(page);

  const onNextPage = () => {
    const value = page + 1;
    setPage(value);
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
      <PaddedInputScrollView>
        {!showTeamsRanking && playersList.isSuccess && (
          <PlayersRanking players={playersList.data!} />
        )}
        {showTeamsRanking && teamList.isSuccess && (
          <TeamsRanking teams={teamList.data!} />
        )}
        <View style={styles.buttonGroup}>
          <AppButton onPress={onPreviousPage}>Wstecz</AppButton>
          <AppButton onPress={onNextPage}>Naprzód</AppButton>
        </View>
      </PaddedInputScrollView>
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
