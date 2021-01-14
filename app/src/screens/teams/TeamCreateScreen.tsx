import { yupResolver } from '@hookform/resolvers/yup';
import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImageSourcePropType, Keyboard, StyleSheet, View } from 'react-native';
import { HelperText, useTheme } from 'react-native-paper';
import * as yup from 'yup';

import { ContainerWithAvatar } from '../../components/layout/ContainerWithAvatar';
import { PaddedInputScrollView } from '../../components/layout/PaddedInputScrollView';
import { AppButton } from '../../components/shared/AppButton';
import { AppInput } from '../../components/shared/AppInput';
import { AppText } from '../../components/shared/AppText';
import { AvatarSelectButton } from '../../components/shared/AvatarSelectButton';
import { useTeamCreateMutation } from '../../hooks/useTeamCreateMutation';
import { useTeamProfileQuery } from '../../hooks/useTeamManageQuery';
import { useUpdateTeamAvatarMutation } from '../../hooks/useUpdateTeamAvatarMutation';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { TeamProfilePayload } from '../../types/teamProfile';
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
  const theme = useTheme();
  const img = require('../../../assets/versioned_initial_avatar.png').toString();

  const [mutate, mutation] = useTeamCreateMutation();
  const [mutateTeamAvatar, mutationTeamAvatar] = useUpdateTeamAvatarMutation();

  const [avatar, setAvatar] = useState<string>(img);

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

  const changeAvatar = async (avatarUri: string, tempdata: any) => {
    mutateTeamAvatar({
      avatarUri,
      team_id: tempdata.id.toString()!,
    }).then((r) => navigation.push('TeamManage'));
  };

  const onPress = async ({ teamName, description }: TeamCreateFormData) => {
    Keyboard.dismiss();

    try {
      const tempData = await mutate({ name: teamName, description });
      await changeAvatar(avatar, tempData?.data.data);
    } catch (error) {
      setResponseErrors(error, setError);
    }
  };

  return (
    <ContainerWithAvatar avatar={{ uri: avatar }}>
      <View style={styles.avatarBtnWrapper}>
        <AvatarSelectButton
          avatarUri={avatar}
          onAvatarChange={(avatarUri) => setAvatar(avatarUri)}
        />
      </View>

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
  avatarBtnWrapper: {
    left: 200,
    top: -60,
  },
});
