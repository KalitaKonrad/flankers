import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';

import { theme } from '../../theme';
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

const getMatchListTitle = (outcome: MatchOutcome) => {
  const outcomeWithAmount =
    outcome.verdict === MatchVerdict.WIN
      ? `+${outcome.moneyAmount}`
      : `-${outcome.moneyAmount}`;

  return outcomeWithAmount + '.00 PLN';
};

export const WalletMatchHistory: React.FC<MatchHistoryProps> = ({
  name,
  matchHistory,
}) => {
  const matchOutcome = getMatchOutcome();

  return (
    <ScrollView style={[styles.container]}>
      <List.Item
        // TODO: display dynamically
        title={
          <Text style={styles.title}>{getMatchListTitle(matchOutcome)}</Text>
        }
        left={(props) => <List.Icon {...props} icon="star" />}
        right={(props) => <Text>10 min ago</Text>}
        style={styles.item}
      />
      <List.Item
        // TODO: display dynamically
        title={
          <Text style={styles.title}>{getMatchListTitle(matchOutcome)}</Text>
        }
        left={(props) => <List.Icon {...props} icon="star" />}
        right={() => <Text>10 min ago</Text>}
        style={styles.item}
      />
      <List.Item
        // TODO: display dynamically
        title={
          <Text style={styles.title}>{getMatchListTitle(matchOutcome)}</Text>
        }
        left={(props) => <List.Icon {...props} icon="star" />}
        right={(props) => <Text>10 min ago</Text>}
        style={styles.item}
      />
      <List.Item
        // TODO: display dynamically
        title={
          <Text style={styles.title}>{getMatchListTitle(matchOutcome)}</Text>
        }
        left={(props) => <List.Icon {...props} icon="star" />}
        right={() => <Text>10 min ago</Text>}
        style={styles.item}
      />
      <List.Item
        // TODO: display dynamically
        title={
          <Text style={styles.title}>{getMatchListTitle(matchOutcome)}</Text>
        }
        left={(props) => <List.Icon {...props} icon="star" />}
        right={(props) => <Text>10 min ago</Text>}
        style={styles.item}
      />
      <List.Item
        // TODO: display dynamically
        title={
          <Text style={styles.title}>{getMatchListTitle(matchOutcome)}</Text>
        }
        left={(props) => <List.Icon {...props} icon="star" />}
        right={() => <Text>10 min ago</Text>}
        style={styles.item}
      />
      <List.Item
        // TODO: display dynamically
        title={
          <Text style={styles.title}>{getMatchListTitle(matchOutcome)}</Text>
        }
        left={(props) => <List.Icon {...props} icon="star" />}
        right={(props) => <Text>10 min ago</Text>}
        style={styles.item}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.white,
  },
  item: {
    marginHorizontal: 5,
  },
  title: {
    fontSize: 24,
  },
});
