import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, View } from 'react-native';
import { HelperText, useTheme } from 'react-native-paper';
import * as yup from 'yup';

import { ContainerWithAvatar } from '../../components/layout/ContainerWithAvatar';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { AppButton } from '../../components/shared/AppButton';
import { AppInput } from '../../components/shared/AppInput';
import { AppText } from '../../components/shared/AppText';
import { useProfileEditMutation } from '../../hooks/useEditProfileMutation';
import { setResponseErrors } from '../../utils/setResponseErrors';
import { ProfileScreenStackParamList } from './ProfileScreenStack';

type ProfileEditScreenProps = StackScreenProps<
  ProfileScreenStackParamList,
  'ProfileEdit'
>;

type ProfileEditFormData = {
  name: string;
  actualPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

const ProfileEditSchema = yup.object().shape({
  name: yup.string().required('Nick jest wymagany'),
  actualPassword: yup.string().required('Obecne hasło jest wymagane'),
  newPassword: yup
    .string()
    .min(8, 'Hasło musi składać się z min. 8 znaków')
    .required('Nowe hasło jest wymagane'),
  newPasswordConfirm: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Hasła muszą być identyczne')
    .required('Powtórz hasło'),
});

export const ProfileEditScreen: React.FC<ProfileEditScreenProps> = ({
  navigation,
}) => {
  const [mutate, mutation] = useProfileEditMutation();
  const theme = useTheme();

  const {
    register,
    setValue,
    setError,
    errors,
    handleSubmit,
  } = useForm<ProfileEditFormData>({
    resolver: yupResolver(ProfileEditSchema),
  });

  useEffect(() => {
    register('name');
    register('actualPassword');
    register('newPassword');
    register('newPasswordConfirm');
  }, [register]);

  const onEdit = async ({ name, newPassword }: ProfileEditFormData) => {
    Keyboard.dismiss();

    try {
      await mutate({ name, password: newPassword });
      navigation.push('Profile');
    } catch (error) {
      setResponseErrors(error, setError);
    }
  };

  return (
    <ContainerWithAvatar avatar={require('../../../assets/avatar.png')}>
      <View style={styles.meta}>
        <AppText variant="h2">Zmiana danych</AppText>
      </View>
      <PaddedInputScrollView>
        <AppInput
          style={styles.row}
          mode="outlined"
          label="Nazwa użytkownika"
          error={!!errors.name}
          onChangeText={(text) => setValue('name', text)}
        />
        {!!errors.name && (
          <HelperText type="error" visible={!!errors.name}>
            {errors.name?.message}
          </HelperText>
        )}
        <AppInput
          secureTextEntry
          style={styles.row}
          mode="outlined"
          label="Aktualne hasło"
          error={!!errors.actualPassword}
          onChangeText={(text) => setValue('actualPassword', text)}
        />
        {!!errors.actualPassword && (
          <HelperText type="error" visible={!!errors.actualPassword}>
            {errors.actualPassword?.message}
          </HelperText>
        )}
        <AppInput
          secureTextEntry
          style={styles.row}
          mode="outlined"
          label="Nowe hasło"
          error={!!errors.newPassword}
          onChangeText={(text) => setValue('newPassword', text)}
        />
        {!!errors.newPassword && (
          <HelperText type="error" visible={!!errors.newPassword}>
            {errors.newPassword?.message}
          </HelperText>
        )}
        <AppInput
          secureTextEntry
          style={styles.row}
          mode="outlined"
          label="Powtórz nowe hasło"
          error={!!errors.newPasswordConfirm}
          onChangeText={(text) => setValue('newPasswordConfirm', text)}
        />
        {!!errors.newPasswordConfirm && (
          <HelperText type="error" visible={!!errors.newPasswordConfirm}>
            {errors.newPasswordConfirm?.message}
          </HelperText>
        )}
        <View style={styles.action}>
          <AppButton
            mode="contained"
            disabled={mutation.isLoading}
            onPress={handleSubmit(onEdit)}>
            Zapisz zmiany
          </AppButton>
        </View>
      </PaddedInputScrollView>
    </ContainerWithAvatar>
  );
};

const styles = StyleSheet.create({
  meta: {
    alignItems: 'center',
    marginBottom: 24,
  },
  row: {
    marginBottom: 8,
  },
  action: {
    marginTop: 16,
  },
});
