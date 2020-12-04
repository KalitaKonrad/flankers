import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { HeaderWithAvatar } from '../../components/shared/HeaderWithAvatar';
import MyAvatar from '../../components/shared/MyAvatar';
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
    <ScrollView>
      <HeaderWithAvatar color={theme.colors.primary} center>
        <View style={styles.title}>
          <Text style={styles.title}>Edycja profilu</Text>
        </View>
        <View style={styles.avatar}>
          <MyAvatar />
        </View>
      </HeaderWithAvatar>
      <View style={styles.note}>
        <Text style={[TextStyle.noteH2]}>Zmiana danych</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Nazwa użytkownika"
          blurOnSubmit
          selectionColor={theme.colors.primary}
          defaultValue={username}
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
          placeholder="Jebać Jasło"
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
    </ScrollView>
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
  inputContainer: {
    top: 90,
    display: 'flex',
    flex: 0.7,
    justifyContent: 'space-around',
    padding: 17,
  },
  textInputStyle: {
    backgroundColor: theme.colors.background.darkGray,
    height: 60,
    textAlign: 'left',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
});
