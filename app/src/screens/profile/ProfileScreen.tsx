import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';

import { HeaderWithAvatar } from '../../components/shared/HeaderWithAvatar';
import MyAvatar from '../../components/shared/MyAvatar';
import { theme } from '../../theme';
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
        <Button //podswitla blad a dzila
          icon="account-edit"
          {...theme.whiteButton} //czemu ...?
          onPress={onEdit}>
          Edytuj
        </Button>
        <Text>Profil</Text>
        <Button icon="logout" {...theme.whiteButton} onPress={onLogout}>
          Wyloguj
        </Button>
        <MyAvatar />
      </HeaderWithAvatar>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(199,253,255,0.98)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  title: {
    top: 50,
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,

    fontWeight: 'bold',
  },
  avatar: {
    display: 'flex',
  },
});
