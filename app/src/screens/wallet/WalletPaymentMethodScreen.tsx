import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

// @ts-ignore
import { CreditCardInput } from 'react-native-credit-card-input';

import { Container } from '../../components/layout/Container';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { AppButton } from '../../components/shared/AppButton';
import { Stripe } from '../../lib/stripe';
import { CreditCardInputResult } from '../../types/credit-card-input-result';
import { WalletScreenStackParamList } from './WalletScreenStack';

type WalletPaymentMethodScreenProps = StackScreenProps<
  WalletScreenStackParamList,
  'PaymentMethod'
>;

export const WalletPaymentMethodScreen: React.FC<WalletPaymentMethodScreenProps> = () => {
  const [card, setCard] = useState<CreditCardInputResult | null>(null);

  const onSave = async () => {
    if (!card || !card.valid) {
      alert('Wprowadź prawidłowe dane');
      return;
    }

    const { number, expiry, cvc } = card.values;
    const [exp_month, exp_year] = expiry.split('/');

    try {
      const response = await Stripe.createPaymentMethod({
        type: 'card',
        card: {
          number,
          cvc,
          exp_month,
          exp_year,
        },
      });
      const { id } = response.data;
    } catch (error) {
      alert(
        'Podczas zapisywania metody płatności wystąpił błąd. Spróbuj ponownie lub skontaktuj się z supportem.'
      );
    }
  };

  return (
    <Container>
      <PaddedInputScrollView>
        <View style={styles.cardContainer}>
          <CreditCardInput
            onChange={(data: CreditCardInputResult) => setCard(data)}
          />
        </View>
        <AppButton mode="contained" onPress={onSave}>
          Zapisz metodę płatności
        </AppButton>
      </PaddedInputScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    paddingVertical: 64,
  },
});
