import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { List, Text } from 'react-native-paper';

import { MatchElementInHistory } from '../../types/match';

interface MatchHistoryListProps {
  matchHistory: MatchElementInHistory[];
  onListEndReached(): void;
}

export const MatchHistoryList: React.FC<MatchHistoryListProps> = (props) => {
  const renderItem = ({
    item,
    index,
  }: ListRenderItemInfo<MatchElementInHistory>) => (
    <List.Item
      title="Mecz"
      titleStyle={styles.elementName}
      description={
        (item.winner ? 'Zwycięstwo' : 'Porażka') +
        ' w trybie ' +
        (item.type === 'team' ? 'drużynowym' : 'ogólnym')
      }
      left={() => (
        <List.Icon {...props} icon={item.winner ? 'trophy' : 'trophy-broken'} />
      )}
      right={() => <Text>#{index + 1}</Text>}
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
    paddingHorizontal: 16,
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
