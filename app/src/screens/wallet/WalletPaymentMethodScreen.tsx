import { StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';

import { Container } from '../../components/layout/Container';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { AppButton } from '../../components/shared/AppButton';
import { useUpdateUserPaymentMethodMutation } from '../../hooks/payments/useUpdateUserPaymentMethodMutation';
import { Stripe } from '../../lib/stripe';
import { CreditCardInputResult } from '../../types/credit-card-input-result';
import { WalletScreenStackParamList } from './WalletScreenStack';
// @ts-ignore

type WalletPaymentMethodScreenProps = StackScreenProps<
  WalletScreenStackParamList,
  'PaymentMethod'
>;

const preparePaymentMethodPayload = (
  card: CreditCardInputResult
): CreatePaymentMethodPayload => {
  const { number, expiry, cvc } = card.values;
  const [exp_month, exp_year] = expiry.split('/');

  return {
    type: 'card',
    card: {
      number,
      cvc,
      exp_month,
      exp_year,
    },
  };
};

export const WalletPaymentMethodScreen: React.FC<WalletPaymentMethodScreenProps> = ({
  navigation,
}) => {
  const [card, setCard] = useState<CreditCardInputResult | null>(null);
  const [updatePaymentMethod] = useUpdateUserPaymentMethodMutation();
  const [isPending, setPending] = useState(false);

  const onSave = async () => {
    if (!card || !card.valid) {
      alert('Wprowadź prawidłowe dane');
      return;
    }

    setPending(true);

    try {
      const response = await Stripe.createPaymentMethod(
        preparePaymentMethodPayload(card)
      );
      const { id } = response.data;
      await updatePaymentMethod(id, { throwOnError: true });
      navigation.navigate('Wallet');
    } catch (error) {
      alert(
        'Podczas zapisywania metody płatności wystąpił błąd. Spróbuj ponownie lub skontaktuj się z supportem.'
      );
    } finally {
      setPending(false);
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
        <AppButton
          loading={isPending}
          disabled={isPending}
          mode="contained"
          onPress={onSave}>
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
