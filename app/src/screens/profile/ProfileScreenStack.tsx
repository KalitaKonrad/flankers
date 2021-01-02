import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { AppButton } from '../../components/shared/AppButton';
import { HeaderAppButton } from '../../components/shared/HeaderAppButton';
import { useAuth } from '../../hooks/useAuth';
import { ProfileEditScreen } from './ProfileEditScreen';
import { ProfileScreen } from './ProfileScreen';

export type ProfileScreenStackParamList = {
  Profile: undefined;
  ProfileEdit: undefined;
};

const Stack = createStackNavigator<ProfileScreenStackParamList>();

export const ProfileScreenStack: React.FC = () => {
  const { logout } = useAuth();
  const theme = useTheme();

  const onLogout = async () => {
    await logout();
  };

  return (
    <Stack.Navigator screenOptions={theme.tallHeader}>
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: 'Profil',
          headerLeft: () => (
            <HeaderAppButton onPress={() => navigation.push('ProfileEdit')}>
              Edytuj
            </HeaderAppButton>
          ),
          headerRight: () => (
            <HeaderAppButton onPress={onLogout}>Wyloguj</HeaderAppButton>
          ),
        })}
      />
      <Stack.Screen
        name="ProfileEdit"
        component={ProfileEditScreen}
        options={{ title: 'Edytuj profil' }}
      />
    </Stack.Navigator>
  );
};
