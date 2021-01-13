import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Platform, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

import { useUpdateAvatarMutation } from '../../hooks/useUpdateAvatarMutation';
import { useUpdateTeamAvatarMutation } from '../../hooks/useUpdateTeamAvatarMutation';
import { AppButton } from './AppButton';

interface AvatarButtonProps {
  avatarUri: string;
  onAvatarChange(uri: string): void;
  isTeamAvatar: boolean;
  teamId?: string;
}

export const AvatarButton: React.FC<AvatarButtonProps> = (props) => {
  const theme = useTheme();

  const [avatar, setAvatar] = useState<string>(props.avatarUri);
  const [mutateAvatar, mutationAvatar] = useUpdateAvatarMutation();
  const [mutateTeamAvatar, mutationTeamAvatar] = useUpdateTeamAvatarMutation();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  });

  const onAvatarButtonClick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      setAvatar(result.uri);
      if (!props.isTeamAvatar) {
        props.onAvatarChange(result.uri);
        mutateAvatar(result.uri);
        return;
      }
      if (props.teamId !== undefined) {
        props.onAvatarChange(result.uri);
        mutateTeamAvatar({ avatarUri: result.uri, team_id: props.teamId });
      }
    }
  };

  return (
    <AppButton
      mode="contained"
      style={{
        backgroundColor: theme.colors.secondary,
        width: '30%',
        position: 'absolute',
        zIndex: 500,
      }}
      onPress={onAvatarButtonClick}>
      Zmień
    </AppButton>
  );
};
