import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { AppButton } from '../../components/shared/AppButton';
import { useAuth } from '../../hooks/useAuth';
import { theme } from '../../theme';
import { ProfileEditScreen } from './ProfileEditScreen';
import { ProfileScreen } from './ProfileScreen';

export type ProfileScreenStackParamList = {
  Profile: undefined;
  ProfileEdit: undefined;
};

const Stack = createStackNavigator<ProfileScreenStackParamList>();

export const ProfileScreenStack: React.FC = () => {
  const { logout } = useAuth();
  const onLogout = async () => {
    await logout();
  };
  return (
    <Stack.Navigator screenOptions={theme.headerWithAvatarOptions}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: 'Profil',
          headerLeft: () => (
            <AppButton
              compact
              icon="account-edit"
              mode="text"
              color={theme.colors.white}
              onPress={() => navigation.push('ProfileEdit')}>
              Edytuj
            </AppButton>
          ),
          headerRight: () => (
            <AppButton
              compact
              icon="logout"
              mode="text"
              color={theme.colors.white}
              onPress={onLogout}>
              Wyloguj
            </AppButton>
          ),
        })}
      />
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
    </Stack.Navigator>
  );
};
