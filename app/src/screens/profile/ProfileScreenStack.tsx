import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { HeaderAppButton } from '../../components/shared/HeaderAppButton';
import { useAuth } from '../../hooks/useAuth';
import { useNotificationHandler } from '../../hooks/useNotificationHandler';
import { useUserProfileQuery } from '../../hooks/user/useUserProfileQuery';
import { ProfileEditRouteParameters } from '../../types/ProfileEditRouteParameters';
import { BottomTabNavigationParamList } from '../AppScreenStack';
import { ProfileEditScreen } from './ProfileEditScreen';
import { ProfileScreen } from './ProfileScreen';

export type ProfileScreenStackParamList = {
  Profile: undefined;
  ProfileEdit: ProfileEditRouteParameters;
};

type ProfileScreenStackProps = MaterialBottomTabScreenProps<
  BottomTabNavigationParamList,
  'Profile'
>;

const Stack = createStackNavigator<ProfileScreenStackParamList>();

export const ProfileScreenStack: React.FC<ProfileScreenStackProps> = ({
  navigation,
}) => {
  const { logout } = useAuth();
  const userProfile = useUserProfileQuery();
  useNotificationHandler(navigation);

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
