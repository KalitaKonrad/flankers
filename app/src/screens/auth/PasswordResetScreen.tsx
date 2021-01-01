import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { HelperText, Paragraph } from 'react-native-paper';
import * as yup from 'yup';

import { Container } from '../../components/layout/Container';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { AppButton } from '../../components/shared/AppButton';
import { AppInput } from '../../components/shared/AppInput';
import { AuthScreenStackParamList } from './AuthScreenStack';

type PasswordResetScreenProps = object &
  StackScreenProps<AuthScreenStackParamList, 'PasswordReset'>;

interface PasswordResetFormData {
  email: string;
}

const RegisterSchema = yup.object().shape({
  email: yup
    .string()
    .email('Podaj poprawny adres email')
    .required('Adres email jest wymagany'),
});

export const PasswordResetScreen: React.FC<PasswordResetScreenProps> = ({
  navigation,
}) => {
  const {
    register,
    setValue,
    errors,
    handleSubmit,
  } = useForm<PasswordResetFormData>({
    resolver: yupResolver(RegisterSchema),
  });

  useEffect(() => {
    register('email');
  }, [register]);

  const onResetPassword = async ({ email }: PasswordResetFormData) => {
    console.warn('Not implemented');
  };

  return (
    <Container>
      <PaddedInputScrollView>
        <Paragraph style={styles.info}>
          Podaj adres email, który został użyty podczas rejestracji. Prześlemy
          na niego link, którym dokonasz resetu hasła
        </Paragraph>
        <View style={styles.row}>
          <AppInput
            label="Adres email"
            mode="outlined"
            keyboardType="email-address"
            autoCompleteType="email"
            error={!!errors.email}
            onChangeText={(value) => setValue('email', value)}
          />
          {!!errors.email && (
            <HelperText type="error" visible={!!errors.email}>
              {errors.email?.message}
            </HelperText>
          )}
        </View>
        <View style={styles.actions}>
          <AppButton mode="contained" onPress={handleSubmit(onResetPassword)}>
            Resetuj hasło
          </AppButton>
        </View>
      </PaddedInputScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  info: {
    textAlign: 'center',
    letterSpacing: 0,
  },
  row: {
    marginTop: 32,
  },
  actions: {
    marginTop: 16,
  },
});
