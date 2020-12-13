import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import { HelperText } from 'react-native-paper';
import * as yup from 'yup';

import { AppButton } from '../../components/shared/AppButton';
import { AppInput } from '../../components/shared/AppInput';
import { Container } from '../../components/shared/Container';
import { useAuth } from '../../hooks/useAuth';
import { setResponseErrors } from '../../utils/setResponseErrors';
import { AuthScreenStackParamList } from './AuthScreenStack';

type LoginPageProps = object &
  StackScreenProps<AuthScreenStackParamList, 'Login'>;

type LoginFormData = {
  email: string;
  password: string;
};

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Podaj poprawny adres email')
    .required('Adres email jest wymagany'),
  password: yup.string().required('Hasło jest wymagane'),
});

export const LoginScreen: React.FC<LoginPageProps> = ({ navigation }) => {
  const { login } = useAuth();
  const [isPending, setPending] = useState(false);

  const {
    register,
    setValue,
    setError,
    errors,
    handleSubmit,
  } = useForm<LoginFormData>({
    resolver: yupResolver(LoginSchema),
  });

  useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  const onLogin = async ({ email, password }: LoginFormData) => {
    Keyboard.dismiss();
    setPending(true);

    try {
      await login(email, password);
    } catch (error) {
      setResponseErrors(error, setError);
      const generalMessage = error.response.data.errors?.all;
      if (generalMessage) {
        setError('email', {
          type: 'server',
          message: generalMessage,
        });
      }
      setPending(false);
    }
  };

  return (
    <Container>
      <View style={styles.row}>
        <AppInput
          label="Email"
          mode="outlined"
          autoCompleteType="email"
          keyboardType="email-address"
          error={!!errors.email}
          onChangeText={(value) => setValue('email', value)}
        />
        {!!errors.email && (
          <HelperText type="error" visible={!!errors.email}>
            {errors.email?.message}
          </HelperText>
        )}
      </View>
      <View style={styles.row}>
        <AppInput
          secureTextEntry
          label="Hasło"
          mode="outlined"
          autoCompleteType="password"
          error={!!errors.password}
          onChangeText={(value) => setValue('password', value)}
        />
        {!!errors.password && (
          <HelperText type="error" visible={!!errors.password}>
            {errors.password?.message}
          </HelperText>
        )}
      </View>
      <View style={styles.actions}>
        <AppButton
          disabled={isPending}
          mode="contained"
          onPress={handleSubmit(onLogin)}>
          Zaloguj
        </AppButton>
        <AppButton onPress={() => navigation.navigate('PasswordReset')}>
          Zapomniałeś hasła?
        </AppButton>
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  row: {
    marginBottom: 8,
  },
  actions: {
    marginTop: 24,
  },
});
