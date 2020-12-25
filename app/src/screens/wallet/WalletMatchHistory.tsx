import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';

import { theme } from '../../theme';
import { MatchResponse } from '../../types/matchResponse';

interface MatchHistoryProps {
  name: string;
  matchHistory: MatchResponse[];
}

interface WalletMatchItemProps {
  item: MatchResponse;
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

const getMatchListTitle = (outcome: MatchOutcome) => {
  const outcomeWithAmount =
    outcome.verdict === MatchVerdict.WIN
      ? `+${outcome.moneyAmount}`
      : `-${outcome.moneyAmount}`;

  return outcomeWithAmount + '.00 PLN';
};

// TODO: display dynamically
const renderData = () => {
  const matchOutcome = getMatchOutcome();

  const data = [];
  for (let i = 0; i < 15; i++) {
    data.push(i);
  }

  return data.map((i) => (
    <List.Item
      title={
        <Text style={styles.title}>{getMatchListTitle(matchOutcome)}</Text>
      }
      key={i}
      left={(props) => <List.Icon {...props} icon="star" />}
      right={(props) => <Text>10 min ago</Text>}
      style={styles.item}
    />
  ));
};

export const WalletMatchHistory: React.FC<MatchHistoryProps> = ({
  name,
  matchHistory,
}) => {
  return (
    <ScrollView style={[styles.container]}>
      {renderData().map((item) => item)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  item: {
    marginHorizontal: 5,
  },
  title: {
    fontSize: 24,
  },
});
