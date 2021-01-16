import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { RankingScreen } from './RankingScreen';

export type RankingScreenStackParamList = {
  Ranking: undefined;
};

const Stack = createStackNavigator<RankingScreenStackParamList>();

export const RankingScreenStack: React.FC = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Ranking"
      screenOptions={theme.primaryHeader}>
      <Stack.Screen
        name="Ranking"
        component={RankingScreen}
        options={{ title: 'Ranking' }}
      />
    </Stack.Navigator>
  );
};
