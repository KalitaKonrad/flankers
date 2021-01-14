import { StackScreenProps } from '@react-navigation/stack';
import React, { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';

import { Container } from '../../components/layout/Container';
import { AppButton } from '../../components/shared/AppButton';
import { AppText } from '../../components/shared/AppText';
import { NumberSelector } from '../../components/shared/NumberSelector';
import RoundInformation from '../../components/shared/RoundInformation';
import { Modal } from '../../components/shared/modal/Modal';
import { WalletTransactionHistoryList } from '../../components/wallet/WalletTransactionHistoryList';
import { WalletScreenStackParamList } from './WalletScreenStack';

type WalletScreenProps = StackScreenProps<WalletScreenStackParamList, 'Wallet'>;

export const WalletScreen: React.FC<WalletScreenProps> = ({ navigation }) => {
  const balance = 20;
  const modalRef = useRef<BottomSheet | null>(null);
  const [topUpAmount, setTopUpAmount] = useState(0);

  return (
    <Container>
      <View style={styles.balanceContainer}>
        <RoundInformation
          mainText={`${balance.toFixed(2)} PLN`}
          subText="Aktualny stan konta"
          buttonText="Doładuj"
          onButtonPress={() => modalRef?.current?.snapTo(0)}
        />
      </View>
      <AppText variant="h1" style={styles.header}>
        Historia
      </AppText>
      {/* TODO: ADD LIST PLACEHOLDER WHEN MATCH HISTORY IS AVAILABLE*/}
      <WalletTransactionHistoryList />
      <Modal ref={modalRef} title="Wybierz kwotę doładowania">
        <View style={styles.numberSelectorContainer}>
          <NumberSelector
            min={0}
            step={0.5}
            numberFormatter={(value) => value.toFixed(2)}
            onValueChange={(value) => setTopUpAmount(value)}
          />
        </View>
        <AppButton mode="contained">Doładuj</AppButton>
      </Modal>
    </Container>
  );
};

const styles = StyleSheet.create({
  balanceContainer: {
    alignItems: 'center',
    marginVertical: 32,
  },
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  numberSelectorContainer: {
    alignItems: 'center',
  },
});
