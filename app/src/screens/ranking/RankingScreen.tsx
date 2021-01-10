import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Container } from '../../components/layout/Container';
import { PlayersRanking } from '../../components/ranking/PlayersRanking';
import { TeamsRanking } from '../../components/ranking/TeamRanking';
import { Switch } from '../../components/shared/Switch';
import { RankingScreenStackParamList } from './RankingScreenStack';

type RankingScreenProps = StackScreenProps<
  RankingScreenStackParamList,
  'Ranking'
>;

export const RankingScreen: React.FC<RankingScreenProps> = ({ navigation }) => {
  const [showTeamsRanking, setShowTeamsRanking] = useState(false);

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
      {!showTeamsRanking && <PlayersRanking />}
      {showTeamsRanking && <TeamsRanking />}
    </Container>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    paddingHorizontal: 16,
    marginVertical: 24,
  },
});
