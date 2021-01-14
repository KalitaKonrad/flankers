import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';

// @ts-ignore
import { CreditCardInput } from 'react-native-credit-card-input';

import { Container } from '../../components/layout/Container';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { AppButton } from '../../components/shared/AppButton';
import { CreditCardInputResult } from '../../types/credit-card-input-result';
import { WalletScreenStackParamList } from './WalletScreenStack';

type WalletPaymentMethodScreenProps = StackScreenProps<
  WalletScreenStackParamList,
  'PaymentMethod'
>;

export const WalletPaymentMethodScreen: React.FC<WalletPaymentMethodScreenProps> = () => {
  return (
    <Container>
      <PaddedInputScrollView>
        <View style={styles.cardContainer}>
          <CreditCardInput
            onChange={(data: CreditCardInputResult) => console.log(data)}
          />
        </View>
        <AppButton mode="contained">Zapisz metodę płatności</AppButton>
      </PaddedInputScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 64,
  },
});
