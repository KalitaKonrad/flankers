import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { useNotificationHandler } from '../../hooks/notifications/useNotificationHandler';
import { MatchLocationSelectMapRoutesParameters } from '../../types/MatchLocationSelectMapRoutesParamaters';
import { BottomTabNavigationParamList } from '../AppScreenStack';
import { MatchCreateSelectLocationScreen } from './MatchCreateSelectLocationScreen';
import { MatchCreateSettingsScreen } from './MatchCreateSettingsScreen';
import {
  MatchInLobbyScreen,
  MatchInLobbyScreenRouteParams,
} from './MatchInLobbyScreen';
import {
  MatchInProgressScreen,
  MatchInProgressScreenRouteParams,
} from './MatchInProgressScreen';
import { MatchJoinFromMapScreen } from './MatchJoinFromMapScreen';

export type MatchScreenStackParamList = {
  MatchActionChoice: undefined;
  MatchCreate: undefined;
  MatchJoinFromMap: undefined;
  MatchInLobby: MatchInLobbyScreenRouteParams;
  MatchInProgress: MatchInProgressScreenRouteParams;
  MatchLocation: MatchLocationSelectMapRoutesParameters;
};

type MatchScreenStackProps = MaterialBottomTabScreenProps<
  BottomTabNavigationParamList,
  'Match'
>;

const Stack = createStackNavigator<MatchScreenStackParamList>();

export const MatchScreenStack: React.FC<MatchScreenStackProps> = ({
  navigation,
}) => {
  const theme = useTheme();

  useNotificationHandler(navigation);

  return (
    <Stack.Navigator
      initialRouteName="MatchJoinFromMap"
      screenOptions={theme.primaryHeader}>
      <Stack.Screen
        name="MatchCreate"
        component={MatchCreateSettingsScreen}
        options={{ title: 'Nowy mecz' }}
      />
      <Stack.Screen
        name="MatchJoinFromMap"
        component={MatchJoinFromMapScreen}
        options={{ title: 'Mecze w okolicy' }}
      />
      <Stack.Screen
        name="MatchLocation"
        component={MatchCreateSelectLocationScreen}
        options={{ title: 'Nowy mecz' }}
      />
      <Stack.Screen
        name="MatchInLobby"
        component={MatchInLobbyScreen}
        options={{ title: 'Lobby' }}
      />
      <Stack.Screen
        name="MatchInProgress"
        component={MatchInProgressScreen}
        options={{ title: 'Mecz w trakcie' }}
      />
    </Stack.Navigator>
  );
};
