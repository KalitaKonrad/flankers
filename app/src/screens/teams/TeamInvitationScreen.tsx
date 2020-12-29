import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';
import { HelperText, useTheme } from 'react-native-paper';
import * as yup from 'yup';

import { AppInput } from '../../components/shared/AppInput';
import { HeaderWithAvatar } from '../../components/shared/HeaderWithAvatar';
import MyAvatar from '../../components/shared/MyAvatar';
import { ScreenContent } from '../../components/shared/ScreenContent';
import { SubmitButton } from '../../components/shared/SubmitButton';
import { useTeamInvitationMutation } from '../../hooks/useTeamInvitationMutation';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { ObjectStyle, TextStyle, theme } from '../../theme';
import { setResponseErrors } from '../../utils/setResponseErrors';
import { TeamScreenStackParamList } from './TeamScreenStack';

type TeamInvitationScreenProps = object &
  StackScreenProps<TeamScreenStackParamList, 'TeamCreate'>;

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
  const [mutate, mutation] = useTeamInvitationMutation();
  const theme = useTheme();

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

    try {
      if (userProfile.data?.current_team_id !== undefined) {
        await mutate({ email, team_id: userProfile.data?.current_team_id });
      }
    } catch (error) {
      setResponseErrors(error, setError);
    }
  };

  return (
    <InputScrollView>
      <HeaderWithAvatar color={theme.colors.primary} center>
        <View style={TextStyle.headerWithAvatarTitle}>
          <Text style={TextStyle.headerWithAvatarTitle}>Zaproś</Text>
        </View>
        <View style={ObjectStyle.headerWithAvatarImage}>
          <MyAvatar
            src="../assets/avatar.png"
            height={150}
            width={150}
            isBorder
          />
        </View>
      </HeaderWithAvatar>
      <ScreenContent>
        <View style={styles.note}>
          <Text style={[TextStyle.noteH2]}>Zaproś użytkownika</Text>
        </View>
        <View style={styles.container}>
          <AppInput
            style={{ marginBottom: 7 }}
            label="Email użytkownika"
            onChangeText={(text) => setValue('email', text)}
          />
          {!!errors.email && (
            <HelperText type="error" visible={!!errors.email}>
              {errors.email?.message}
            </HelperText>
          )}
        </View>
        <SubmitButton
          disabled={mutation.isLoading}
          backgroundColor={theme.colors.primary}
          labelColor={theme.colors.white}
          onPress={handleSubmit(onPress)}>
          Prześlij zaproszenie
        </SubmitButton>
      </ScreenContent>
    </InputScrollView>
  );
};

const styles = StyleSheet.create({
  note: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 70,
  },
  container: {
    top: 90,
    height: 350,
  },
  textInputStyle: {
    borderRadius: 12,
    margin: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: theme.colors.darkGray,
  },
});
