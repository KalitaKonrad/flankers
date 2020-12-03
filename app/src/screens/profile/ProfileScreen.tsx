import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Button, StyleSheet, Text } from 'react-native';

import { HeaderWithAvatar } from '../../components/shared/HeaderWithAvatar';
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
        <Button title="Edytuj" onPress={onEdit} />
        <Text>Profil</Text>
        <Button title="Wyloguj" onPress={onLogout} />
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
});
