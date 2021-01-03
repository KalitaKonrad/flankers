import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { List } from 'react-native-paper';

import { shuffle } from '../../utils/shuffle';
import { AppText } from '../shared/AppText';

enum TransactionType {
  MATCH_WIN,
  MATCH_LOSS,
  TOP_UP,
}

interface TransactionRecord {
  amount: number;
  type: TransactionType;
}

const TRANSACTION_TYPE_TO_AMOUNT_SIGN = {
  [TransactionType.TOP_UP]: '+',
  [TransactionType.MATCH_WIN]: '+',
  [TransactionType.MATCH_LOSS]: '-',
};

const TRANSACTION_TYPE_TO_NAME = {
  [TransactionType.TOP_UP]: 'Doładowanie',
  [TransactionType.MATCH_WIN]: 'Wygrany mecz',
  [TransactionType.MATCH_LOSS]: 'Przegrany mecz',
};

const TRANSACTION_TYPE_TO_ICON = {
  [TransactionType.TOP_UP]: 'bank-plus',
  [TransactionType.MATCH_WIN]: 'trophy',
  [TransactionType.MATCH_LOSS]: 'trophy-broken',
};

const mockLosses = Array(5).fill({
  amount: 5,
  type: TransactionType.MATCH_LOSS,
});
const mockWins = Array(5).fill({ amount: 10, type: TransactionType.MATCH_WIN });
const mockTopUps = Array(5).fill({ amount: 15, type: TransactionType.TOP_UP });

const mockData: TransactionRecord[] = shuffle([
  ...mockLosses,
  ...mockWins,
  ...mockTopUps,
]);

export const WalletTransactionHistoryList: React.FC = () => {
  const renderItem = ({ item }: ListRenderItemInfo<TransactionRecord>) => (
    <List.Item
      title={`${
        TRANSACTION_TYPE_TO_AMOUNT_SIGN[item.type]
      }${item.amount.toFixed(2)}PLN`}
      right={() => <AppText>{TRANSACTION_TYPE_TO_NAME[item.type]}</AppText>}
      left={(props) => (
        <List.Icon {...props} icon={TRANSACTION_TYPE_TO_ICON[item.type]} />
      )}
    />
  );

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      data={mockData}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingRight: 16,
  },
});
