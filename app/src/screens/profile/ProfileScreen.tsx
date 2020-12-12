import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';

import { HeaderWithAvatar } from '../../components/shared/HeaderWithAvatar';
import { MatchHistory } from '../../components/shared/MatchHistory';
import MyAvatar from '../../components/shared/MyAvatar';
import { theme, TextStyle } from '../../theme';
import { ProfileScreenStackParamList } from './ProfileScreenStack';

type ProfileScreenProps = object &
  StackScreenProps<ProfileScreenStackParamList, 'Profile'>;

export const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const onEdit = () => {
    navigation.push('ProfileEdit');
  };

  const onLogout = () => {
    console.log('logout');
  };

  return (
    <>
      <HeaderWithAvatar color={theme.colors.primary}>
        <Button
          icon="account-edit"
          mode="text"
          color={theme.colors.background.white}
          onPress={onEdit}>
          Edytuj
        </Button>
        <Text style={styles.title}>Profil</Text>
        <Button
          icon="logout"
          mode="text"
          color={theme.colors.background.white}
          onPress={onLogout}>
          Wyloguj
        </Button>
        <View style={styles.avatar}>
          <MyAvatar height={150} width={150} />
        </View>
      </HeaderWithAvatar>
      <View style={styles.note}>
        <Text style={[TextStyle.noteH1]}>USERNAME</Text>
        <Text style={[TextStyle.noteH3]}>Punkty rankingowe: 2137</Text>
      </View>
      <View style={styles.matchHistory}>
        <MatchHistory name="name" matchHistory={[]} />
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
  matchHistory: {
    display: 'flex',
    top: 90,
  },
});
