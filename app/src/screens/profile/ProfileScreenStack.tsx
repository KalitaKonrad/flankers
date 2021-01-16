import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { HeaderAppButton } from '../../components/shared/HeaderAppButton';
import { useAuth } from '../../hooks/useAuth';
import { useUserProfileQuery } from '../../hooks/useUserProfileQuery';
import { ProfileEditRouteParameters } from '../../types/ProfileEditRouteParameters';
import { ProfileEditScreen } from './ProfileEditScreen';
import { ProfileScreen } from './ProfileScreen';

export type ProfileScreenStackParamList = {
  Profile: undefined;
  ProfileEdit: ProfileEditRouteParameters;
};

const Stack = createStackNavigator<ProfileScreenStackParamList>();

export const ProfileScreenStack: React.FC = () => {
  const { logout } = useAuth();
  const userProfile = useUserProfileQuery();

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
            <HeaderAppButton
              onPress={() =>
                navigation.push('ProfileEdit', {
                  avatar: userProfile.data?.versioned_avatar,
                })
              }>
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
