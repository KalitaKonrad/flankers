import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { MatchCreateScreen } from './MatchCreateScreen';
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
  MatchLocation: undefined;
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
        component={MatchCreateScreen}
        options={{ title: 'Utwórz mecz' }}
      />
      <Stack.Screen
        name="MatchJoinFromMap"
        component={MatchJoinFromMapScreen}
        options={{ title: 'Mecze w okolicy' }}
      />
      <Stack.Screen name="MatchLocation" component={MatchLocationScreen} />
      <Stack.Screen name="MatchInLobby" component={MatchInLobbyScreen} />
      <Stack.Screen name="MatchInProgress" component={MatchInProgressScreen} />
    </Stack.Navigator>
  );
};
