import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { MatchLocationSelectMapRoutesParameters } from '../../types/MatchLocationSelectMapRoutesParamaters';
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

const Stack = createStackNavigator<MatchScreenStackParamList>();

export const MatchScreenStack: React.FC = () => {
  const theme = useTheme();

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
        component={MatchInProgressScreen}
        options={{ title: 'Lobby' }}
      />
      {/*<Stack.Screen name="MatchInProgress" component={MatchInProgressScreen} />*/}
    </Stack.Navigator>
  );
};
