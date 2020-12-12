import React from 'react';
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { List } from 'react-native-paper';

import { Match } from '../../types/match';

interface MatchHistoryProps {
  name: string;
  matchHistory: Match[];
}

interface WalletMatchItemProps {
  item: Match;
  onPress: () => void;
}

const WalletMatchItem: React.FC<WalletMatchItemProps> = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} />
);

enum MatchVerdict {
  WIN = 'win',
  LOSS = 'loss',
}

interface MatchOutcome {
  verdict: MatchVerdict;
  moneyAmount: number;
}

const getMatchOutcome = (): MatchOutcome => {
  return { verdict: MatchVerdict.WIN, moneyAmount: 10 };
};

export const WalletMatchHistory: React.FC<MatchHistoryProps> = ({
  name,
  matchHistory,
}) => {
  const matchOutcome = getMatchOutcome();

  return (
    <List.Item
      // TODO: render conditionally match outcome (win/loss etc)
      title="hehe"
      description="Result"
      left={(props) => <List.Icon {...props} icon="star" />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});
