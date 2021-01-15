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
import { useTeamCreateMutation } from '../../hooks/useTeamCreateMutation';
import { setResponseErrors } from '../../utils/setResponseErrors';
import { TeamScreenStackParamList } from './TeamScreenStack';

type TeamCreateScreenProps = StackScreenProps<
  TeamScreenStackParamList,
  'TeamCreate'
>;

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
    <ContainerWithAvatar avatar={require('../../../assets/avatar.png')}>
      <View style={styles.meta}>
        <AppText variant="h2">Dane zespołu</AppText>
      </View>
      <PaddedInputScrollView>
        <View style={styles.row}>
          <AppInput
            label="Nazwa zespołu"
            mode="outlined"
            onChangeText={(text) => setValue('teamName', text)}
          />
          {!!errors.teamName && (
            <HelperText type="error" visible={!!errors.teamName}>
              {errors.teamName?.message}
            </HelperText>
          )}
        </View>
        <View style={styles.row}>
          <AppInput
            multiline
            label="Opis"
            mode="outlined"
            onChangeText={(text) => setValue('description', text)}
          />
        </View>
        <View style={styles.action}>
          <AppButton mode="contained" onPress={handleSubmit(onPress)}>
            Utwórz
          </AppButton>
        </View>
      </PaddedInputScrollView>
    </ContainerWithAvatar>
  );
};

const styles = StyleSheet.create({
  meta: {
    alignItems: 'center',
    marginBottom: 16,
  },
  row: {
    marginBottom: 8,
  },
  action: {
    marginTop: 16,
  },
});
