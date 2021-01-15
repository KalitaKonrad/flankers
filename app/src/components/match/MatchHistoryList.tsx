import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { List, Text } from 'react-native-paper';

import { MatchElementInHistory } from '../../types/match';

interface MatchHistoryListProps {
  matchHistory: MatchElementInHistory[];
  onListEnd(): void;
}

export const MatchHistoryList: React.FC<MatchHistoryListProps> = (props) => {
  const renderItem = ({
    item,
    index,
  }: ListRenderItemInfo<MatchElementInHistory>) => (
    <List.Item
      title="Mecz"
      titleStyle={styles.elementName}
      description={item.winner ? `Zwycięstwo ${item.id}` : `Porażka ${item.id}`}
      left={() => <List.Icon {...props} icon="trophy" />}
      right={() => <Text>#{index + 1}</Text>}
    />
  );
  return (
    // <>
    //   {props.matchHistory.map((group, i) => (
    //     <List.Item
    //       title={'Mecz'}
    //       description={group.winner ? 'Zwycięstwo' : 'Porażka'}
    //       left={(props) => <List.Icon {...props} icon={'trophy'} />}
    //     />
    //   ))}
    // </>
    <FlatList
      data={props.matchHistory}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
      keyExtractor={(match) => match.id.toString()}
      onEndReached={() => {
        props.onListEnd();
      }}
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
