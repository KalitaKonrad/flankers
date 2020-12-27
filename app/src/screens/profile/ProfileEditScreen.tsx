import { StackScreenProps } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';

import { AppInput } from '../../components/shared/AppInput';
import { Container } from '../../components/shared/Container';
import { HeaderWithAvatar } from '../../components/shared/HeaderWithAvatar';
import MyAvatar from '../../components/shared/MyAvatar';
import { SubmitButton } from '../../components/shared/SubmitButton';
import { useUpdateAvatarMutation } from '../../hooks/useUpdateAvatarMutation';
import { TextStyle, theme } from '../../theme';
import { ProfileScreenStackParamList } from './ProfileScreenStack';

type ProfileEditScreenProps = object &
  StackScreenProps<ProfileScreenStackParamList, 'ProfileEdit'>;

export const ProfileEditScreen: React.FC<ProfileEditScreenProps> = ({
  navigation,
}) => {
  const [username, setUsername] = React.useState('');
  const [actualPassword, setActualPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [newPasswordRep, setNewPasswordRep] = React.useState('');

  const [avatar, setAvatar] = useState<string>();
  const [mutateAvatar, mutationAvatar] = useUpdateAvatarMutation();

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

  const onEdit = () => {
    if (avatar !== undefined) {
      mutateAvatar({ avatar });
    }
    navigation.push('Profile');
  };

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
    }
  };

  return (
    <>
      <HeaderWithAvatar color={theme.colors.primary} center>
        <View style={styles.title}>
          <Text style={styles.title}>Edycja profilu</Text>
        </View>
        <View style={styles.avatar}>
          {!!avatar && (
            <MyAvatar src={avatar} height={150} width={150} isBorder />
          )}
        </View>
      </HeaderWithAvatar>

      <ScrollView>
        <View style={styles.note}>
          <Text style={[TextStyle.noteH2]}>Zmiana danych</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.placeholder} />
          <AppInput
            style={{ marginBottom: 7 }}
            label="Nazwa użytkownika"
            onChangeText={(text) => setUsername(text)}
          />
          <AppInput
            style={{ marginBottom: 7 }}
            label="Aktualne hasło"
            onChangeText={(text) => setActualPassword(text)}
          />
          <AppInput
            style={{ marginBottom: 7 }}
            label="Nowe hasło"
            onChangeText={(text) => setNewPassword(text)}
          />
          <AppInput
            style={{ marginBottom: 7 }}
            label="Powtórz nowe hasło"
            onChangeText={(text) => setNewPasswordRep(text)}
          />
        </View>
        <SubmitButton
          backgroundColor={theme.colors.primary}
          labelColor={theme.colors.white}
          onPress={onEdit}>
          Zapisz zmiany
        </SubmitButton>
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <SubmitButton
          labelColor={theme.colors.white}
          backgroundColor={theme.colors.secondary}
          onPress={onAvatarButtonClick}>
          Zmień
        </SubmitButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  note: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 70,
  },
  title: {
    position: 'relative',
    top: 0,
    textAlign: 'center',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 0.95,
  },
  avatar: {
    display: 'flex',
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    bottom: -60,
  },
  textInputStyle: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    margin: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    backgroundColor: theme.colors.darkGray,
  },
  container: {
    top: 90,
    height: 390,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWrapper: {
    position: 'absolute',
    right: 80,
    top: 160,
  },
});
