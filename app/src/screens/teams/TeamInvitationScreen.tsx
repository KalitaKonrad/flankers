import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, View } from 'react-native';
import { HelperText } from 'react-native-paper';
import * as yup from 'yup';

import { ContainerWithAvatar } from '../../components/layout/ContainerWithAvatar';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { AppButton } from '../../components/shared/AppButton';
import { AppInput } from '../../components/shared/AppInput';
import { AppText } from '../../components/shared/AppText';
import { useTeamInvitationMutation } from '../../hooks/useTeamInvitationMutation';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { setResponseErrors } from '../../utils/setResponseErrors';
import { TeamScreenStackParamList } from './TeamScreenStack';

type TeamInvitationScreenProps = StackScreenProps<
  TeamScreenStackParamList,
  'TeamCreate'
>;

type InvitationFormData = {
  email: string;
};

const InvitationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Podaj poprawny adres email')
    .required('Adres email jest wymagany'),
});

export const TeamInvitationScreen: React.FC<TeamInvitationScreenProps> = ({
  navigation,
}) => {
  const userProfile = useUserProfileQuery();
  const mutation = useTeamInvitationMutation();
  const versionedAvatar = userProfile?.data?.teams?.[0]?.versioned_avatar;

  const {
    register,
    setValue,
    setError,
    errors,
    handleSubmit,
  } = useForm<InvitationFormData>({
    resolver: yupResolver(InvitationSchema),
  });

  useEffect(() => {
    register('email');
  }, [register]);

  const onPress = async ({ email }: InvitationFormData) => {
    Keyboard.dismiss();
    if (!userProfile.data) {
      return;
    }
    try {
      await mutation.mutateAsync({
        email,
        team_id: userProfile.data?.current_team_id,
      });
    } catch (error) {
      setResponseErrors(error, setError);
    }
  };

  return (
    <ContainerWithAvatar avatar={{ uri: versionedAvatar }}>
      <View style={styles.meta}>
        <AppText variant="h2">Zaproś użytkownika</AppText>
      </View>
      <PaddedInputScrollView>
        <View style={styles.row}>
          <AppInput
            mode="outlined"
            label="Email użytkownika"
            onChangeText={(text) => setValue('email', text)}
          />
          {!!errors.email && (
            <HelperText type="error" visible={!!errors.email}>
              {errors.email?.message}
            </HelperText>
          )}
        </View>
        <AppButton
          mode="contained"
          disabled={mutation.isLoading}
          onPress={handleSubmit(onPress)}>
          Prześlij zaproszenie
        </AppButton>
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
});
