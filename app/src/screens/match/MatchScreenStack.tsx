import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { theme } from '../../theme';
import { MatchCreateScreen } from './MatchCreateScreen';
import { MatchInLobbyScreen } from './MatchInLobbyScreen';
import { MatchInProgressScreen } from './MatchInProgressScreen';
import { MatchJoinFromMapScreen } from './MatchJoinFromMapScreen';
import { MatchLocationScreen } from './MatchLocationScreen';

export type MatchScreenStackParamList = {
  MatchCreate: undefined;
  MatchJoinFromMap: undefined;
  MatchInLobby: undefined;
  MatchInProgress: undefined;
  MatchLocation: undefined;
};

const Stack = createStackNavigator<MatchScreenStackParamList>();

export const MatchScreenStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={theme.headerOptions}>
      <Stack.Screen name="MatchCreate" cowamponent={MatchCreateScreen} />
      <Stack.Screen
        name="MatchJoinFromMap"
        component={MatchJoinFromMapScreen}
      />
      <Stack.Screen name="MatchInLobby" component={MatchInLobbyScreen} />
      <Stack.Screen name="MatchInProgress" component={MatchInProgressScreen} />
      <Stack.Screen name="MatchLocation" component={MatchLocationScreen} />
    </Stack.Navigator>
  );
};
