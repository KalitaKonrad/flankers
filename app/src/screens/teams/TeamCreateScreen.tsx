import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';
import { HelperText, useTheme } from 'react-native-paper';
import * as yup from 'yup';

import { AppInput } from '../../components/shared/AppInput';
import { Avatar } from '../../components/shared/Avatar';
import { HeaderWithAvatar } from '../../components/shared/HeaderWithAvatar';
import { MultilineTextInput } from '../../components/shared/MultilineTextInput';
import { ScreenContent } from '../../components/shared/ScreenContent';
import { SubmitButton } from '../../components/shared/SubmitButton';
import { useTeamCreateMutation } from '../../hooks/useTeamCreateMutation';
import { ObjectStyle, TextStyle, theme } from '../../theme';
import { setResponseErrors } from '../../utils/setResponseErrors';
import { TeamScreenStackParamList } from './TeamScreenStack';

type TeamCreateScreenProps = object &
  StackScreenProps<TeamScreenStackParamList, 'TeamCreate'>;

type TeamCreateFormData = {
  teamName: string;
  description: string;
};

const TeamCreateSchema = yup.object().shape({
  teamName: yup.string().required('Nazwa zespołu jest wymagana'),
  description: yup.string(),
});

export const TeamCreateScreen: React.FC<TeamCreateScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme();

  const [mutate, mutation] = useTeamCreateMutation();

  const {
    register,
    setValue,
    setError,
    errors,
    handleSubmit,
  } = useForm<TeamCreateFormData>({
    resolver: yupResolver(TeamCreateSchema),
  });

  useEffect(() => {
    register('teamName');
    register('description');
  }, [register]);

  const onPress = async ({ teamName, description }: TeamCreateFormData) => {
    Keyboard.dismiss();

    try {
      await mutate({ name: teamName, description });
      navigation.push('TeamManage');
    } catch (error) {
      setResponseErrors(error, setError);
    }
  };

  return (
    <InputScrollView>
      <HeaderWithAvatar color={theme.colors.primary} center>
        <View style={TextStyle.headerWithAvatarTitle}>
          <Text style={TextStyle.headerWithAvatarTitle}>Utwórz zespół</Text>
        </View>
        <View style={ObjectStyle.headerWithAvatarImage}>
          <Avatar src={{ uri: '../assets/avatar.png' }} size={150} border />
        </View>
      </HeaderWithAvatar>
      <ScreenContent>
        <View style={styles.note}>
          <Text style={[TextStyle.noteH2]}>Dane zespołu</Text>
        </View>
        <View style={styles.container}>
          <AppInput
            style={{ marginBottom: 7 }}
            label="Nazwa zespołu"
            onChangeText={(text) => setValue('teamName', text)}
          />
          {!!errors.teamName && (
            <HelperText type="error" visible={!!errors.teamName}>
              {errors.teamName?.message}
            </HelperText>
          )}
          <MultilineTextInput
            label="Opis"
            style={{ marginVertical: 10 }}
            onChangeText={(text) => setValue('description', text)}
          />
        </View>
        <SubmitButton
          backgroundColor={theme.colors.primary}
          labelColor={theme.colors.white}
          onPress={handleSubmit(onPress)}>
          Utwórz
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
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
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
  textMultiLineInputStyle: {
    borderRadius: 12,
    height: 150,
    textAlignVertical: 'top',
    margin: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: theme.colors.darkGray,
  },
});
