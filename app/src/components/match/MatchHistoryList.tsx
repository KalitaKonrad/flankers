import moment from 'moment';
import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { List, Text } from 'react-native-paper';
import { date } from 'yup';

import { MatchElementInHistory } from '../../types/match';
import { AppText } from '../shared/AppText';

interface MatchHistoryListProps {
  matchHistory: MatchElementInHistory[];
  onListEndReached(): void;
}

export const MatchHistoryList: React.FC<MatchHistoryListProps> = (props) => {
  const showDate = (backendDate: string) => {
    console.log('========================', backendDate);
    const date = moment(backendDate);
    console.log();
    return date.format('DD/MM/YYYY HH:mm');
  };

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
      left={(props) => (
        <List.Icon {...props} icon={item.winner ? 'trophy' : 'trophy-broken'} />
      )}
      right={() => <AppText>{showDate(item.updated_at)}</AppText>}
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
