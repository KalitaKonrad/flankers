import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { theme } from '../../theme';
import { MatchActionChoice } from './MatchActionChoice';
import {
  MatchLocationRoutesParameters,
  MatchCreateScreen,
} from './MatchCreateScreen';
import { MatchInLobbyScreen } from './MatchInLobbyScreen';
import { MatchInProgressScreen } from './MatchInProgressScreen';
import { MatchJoinFromMapScreen } from './MatchJoinFromMapScreen';
import { MatchLocationScreen } from './MatchLocationScreen';

export type MatchScreenStackParamList = {
  MatchActionChoice: undefined;
  MatchCreate: undefined;
  MatchJoinFromMap: undefined;
  MatchInLobby: undefined;
  MatchInProgress: undefined;
  MatchLocation: MatchLocationRoutesParameters;
};

const Stack = createStackNavigator<MatchScreenStackParamList>();

export const MatchScreenStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={theme.headerOptions}>
      <Stack.Screen name="MatchActionChoice" component={MatchActionChoice} />
      <Stack.Screen name="MatchCreate" component={MatchCreateScreen} />
      <Stack.Screen
        name="MatchJoinFromMap"
        component={MatchJoinFromMapScreen}
      />
      <Stack.Screen name="MatchLocation" component={MatchLocationScreen} />
      <Stack.Screen name="MatchInLobby" component={MatchInLobbyScreen} />
      <Stack.Screen name="MatchInProgress" component={MatchInProgressScreen} />
    </Stack.Navigator>
  );
};
