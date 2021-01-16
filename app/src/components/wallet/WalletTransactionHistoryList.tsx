import React from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { List } from 'react-native-paper';

import { WalletCharge, WalletChargeSource } from '../../types/payments/wallet';
import { AppText } from '../shared/AppText';

const TRANSACTION_SOURCE_TO_AMOUNT_SIGN = {
  [WalletChargeSource.GENERIC]: '+',
  [WalletChargeSource.GAME_WON]: '+',
  [WalletChargeSource.PURCHASE]: '+',
  [WalletChargeSource.GAME_LOST]: '-',
};

const TRANSACTION_SOURCE_TO_NAME = {
  [WalletChargeSource.PURCHASE]: 'Doładowanie',
  [WalletChargeSource.GAME_WON]: 'Wygrany mecz',
  [WalletChargeSource.GAME_LOST]: 'Przegrany mecz',
  [WalletChargeSource.GENERIC]: 'Akcja administracyjna',
};

const TRANSACTION_SOURCE_TO_ICON = {
  [WalletChargeSource.PURCHASE]: 'bank-plus',
  [WalletChargeSource.GAME_WON]: 'trophy',
  [WalletChargeSource.GAME_LOST]: 'trophy-broken',
  [WalletChargeSource.GENERIC]: 'bank-plus',
};

interface WalletTransactionHistoryListProps {
  transactions: WalletCharge[];
}

export const WalletTransactionHistoryList: React.FC<WalletTransactionHistoryListProps> = ({
  transactions,
}) => {
  const renderItem = ({ item: charge }: ListRenderItemInfo<WalletCharge>) => (
    <List.Item
      title={`${TRANSACTION_SOURCE_TO_AMOUNT_SIGN[charge.source]}${parseFloat(
        charge.amount
      ).toFixed(2)}PLN`}
      right={() => (
        <View style={styles.transactionType}>
          <AppText>{TRANSACTION_SOURCE_TO_NAME[charge.source]}</AppText>
        </View>
      )}
      left={(props) => (
        <List.Icon
          {...props}
          icon={TRANSACTION_SOURCE_TO_ICON[charge.source]}
        />
      )}
    />
  );

  return (
    <FlatList
      contentContainerStyle={styles.contentContainer}
      data={transactions}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.created_at.toString()}-${index}`}
      ListEmptyComponent={<List.Item title="Brak transakcji" />}
    />
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingRight: 16,
  },
  transactionType: {
    justifyContent: 'center',
  },
});
