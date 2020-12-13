import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigatorScreenParams } from '@react-navigation/native';
import React from 'react';

import { useAuth } from '../hooks/useAuth';
import {
  AuthScreenStack,
  AuthScreenStackParamList,
} from '../screens/auth/AuthScreenStack';
import {
  MatchScreenStack,
  MatchScreenStackParamList,
} from '../screens/match/MatchScreenStack';
import {
  ProfileScreenStack,
  ProfileScreenStackParamList,
} from '../screens/profile/ProfileScreenStack';
import { RankingScreen } from '../screens/ranking/RankingScreen';
import {
  TeamScreenStack,
  TeamScreenStackParamList,
} from '../screens/teams/TeamScreenStack';
import { WalletScreen } from '../screens/wallet/WalletScreen';
import { theme } from '../theme';

export type BottomTabNavigationParamList = {
  Auth: NavigatorScreenParams<AuthScreenStackParamList>;
  Match: NavigatorScreenParams<MatchScreenStackParamList>;
  Team: NavigatorScreenParams<TeamScreenStackParamList>;
  Profile: NavigatorScreenParams<ProfileScreenStackParamList>;
  Wallet: undefined;
  Ranking: undefined;
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

export const BottomTabNavigation: React.FC = () => {
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
        options={{ tabBarLabel: 'Match' }}
      />
      <Tab.Screen
        name="Team"
        component={TeamScreenStack}
        options={{ tabBarLabel: 'Teams' }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreenStack}
        options={{ tabBarLabel: 'Profile' }}
      />
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{ tabBarLabel: 'Wallet' }}
      />
      <Tab.Screen
        name="Ranking"
        component={RankingScreen}
        options={{ tabBarLabel: 'Ranking' }}
      />
    </Tab.Navigator>
  );
};
