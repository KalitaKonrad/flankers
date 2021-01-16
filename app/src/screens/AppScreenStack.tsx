import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { useUserProfileQuery } from '../hooks/useUserProfileQuery';
import { AuthScreenStackParamList } from './auth/AuthScreenStack';
import {
  MatchScreenStack,
  MatchScreenStackParamList,
} from './match/MatchScreenStack';
import {
  ProfileScreenStack,
  ProfileScreenStackParamList,
} from './profile/ProfileScreenStack';
import {
  RankingScreenStack,
  RankingScreenStackParamList,
} from './ranking/RankingScreenStack';
import {
  TeamScreenStack,
  TeamScreenStackParamList,
} from './teams/TeamScreenStack';
import { WalletScreenStack } from './wallet/WalletScreenStack';

export type BottomTabNavigationParamList = {
  Auth: NavigatorScreenParams<AuthScreenStackParamList>;
  Match: NavigatorScreenParams<MatchScreenStackParamList>;
  Team: NavigatorScreenParams<TeamScreenStackParamList>;
  Profile: NavigatorScreenParams<ProfileScreenStackParamList>;
  Wallet: undefined;
  Ranking: NavigatorScreenParams<RankingScreenStackParamList>;
};
const Tab = createMaterialBottomTabNavigator<BottomTabNavigationParamList>();

const ROUTE_TO_ICON_MAP: Record<keyof BottomTabNavigationParamList, string> = {
  Auth: 'account',
  Match: 'bottle-wine',
  Team: 'account-group',
  Profile: 'account',
  Wallet: 'wallet',
  Ranking: 'format-list-numbered',
};

export const AppScreenStack: React.FC = () => {
  // Preload user profile
  useUserProfileQuery();
  const theme = useTheme();

  return (
    <Tab.Navigator
      activeColor="#FFF"
      initialRouteName="Match"
      inactiveColor={theme.colors.secondary}
      labeled
      barStyle={{ backgroundColor: theme.colors.primary }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color }) => {
          const iconName = ROUTE_TO_ICON_MAP[route.name];
          return (
            <MaterialCommunityIcons name={iconName} color={color} size={26} />
          );
        },
      })}>
      <Tab.Screen
        name="Match"
        component={MatchScreenStack}
        options={{ tabBarLabel: 'Mecze' }}
      />
      <Tab.Screen
        name="Team"
        component={TeamScreenStack}
        options={{ tabBarLabel: 'Zespół' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreenStack}
        options={{ tabBarLabel: 'Profil' }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreenStack}
        options={{ tabBarLabel: 'Portfel' }}
      />
      <Tab.Screen
        name="Ranking"
        component={RankingScreenStack}
        options={{ tabBarLabel: 'Ranking' }}
      />
    </Tab.Navigator>
  );
};
