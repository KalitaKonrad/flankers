import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { List, Text } from 'react-native-paper';

import { MatchElementInHistory } from '../../types/match';
import { formatDate } from '../../utils/formatBackendTIme';

interface MatchHistoryListProps {
  matchHistory: MatchElementInHistory[];
  onListEndReached(): void;
}

export const MatchHistoryList: React.FC<MatchHistoryListProps> = (props) => {
  const renderItem = ({ item }: ListRenderItemInfo<MatchElementInHistory>) => (
    <List.Item
      title={formatDate(item.updated_at)}
      titleStyle={styles.elementName}
      description={
        (item.winner ? 'Zwycięstwo' : 'Porażka') +
        ' w trybie ' +
        (item.type === 'team' ? 'drużynowym' : 'ogólnym')
      }
      left={(props) => (
        <List.Icon {...props} icon={item.winner ? 'trophy' : 'trophy-broken'} />
      )}
    />
  );
  return (
    <FlatList
      data={props.matchHistory}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      keyExtractor={(match) => match.id.toString()}
      onEndReached={props.onListEndReached}
      onEndReachedThreshold={0.7}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 16,
  },
  elementName: {
    fontWeight: 'bold',
  },
  rightIndexStyle: {
    fontWeight: 'bold',
    textAlign: 'justify',
    marginRight: 12,
    paddingTop: 6,
  },
});
