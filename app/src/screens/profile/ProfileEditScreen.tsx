import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import InputScrollView from 'react-native-input-scroll-view';

import { HeaderWithAvatar } from '../../components/shared/HeaderWithAvatar';
import MyAvatar from '../../components/shared/MyAvatar';
import { SubmitButton } from '../../components/shared/SubmitButton';
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

  const onEdit = () => {
    navigation.push('Profile');
  };

  return (
    <>
      <InputScrollView>
        <HeaderWithAvatar color={theme.colors.primary} center>
          <View style={styles.title}>
            <Text style={styles.title}>Edycja profilu</Text>
          </View>
          <View style={styles.avatar}>
            <MyAvatar
              src="../assets/avatar.png"
              height={150}
              width={150}
              isBorder
            />
          </View>
        </HeaderWithAvatar>
        <View style={styles.note}>
          <Text style={[TextStyle.noteH2]}>Zmiana danych</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.placeholder} />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Nazwa użytkownika"
            blurOnSubmit
            selectionColor={theme.colors.primary}
            defaultValue=""
            onChangeText={(text) => setUsername(text)}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Aktualne hasło"
            blurOnSubmit
            selectionColor={theme.colors.primary}
            onChangeText={(text) => setActualPassword(text)}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Nowe hasło"
            blurOnSubmit
            selectionColor={theme.colors.primary}
            onChangeText={(text) => setNewPassword(text)}
          />
          <TextInput
            style={styles.textInputStyle}
            placeholder="Powtórz nowe hasło"
            blurOnSubmit
            selectionColor={theme.colors.primary}
            onChangeText={(text) => setNewPasswordRep(text)}
          />
        </View>
        <SubmitButton
          backgroundColor={theme.colors.primary}
          labelColor={theme.colors.white}
          onPress={onEdit}>
          Zapisz zmiany
        </SubmitButton>
      </InputScrollView>
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
    height: 350,
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
