import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { useTheme } from 'react-native-paper';

import { useNotificationHandler } from '../../hooks/useNotificationHandler';
import { BottomTabNavigationParamList } from '../AppScreenStack';
import { RankingScreen } from './RankingScreen';

export type RankingScreenStackParamList = {
  Ranking: undefined;
};

type RankingScreenStackProps = MaterialBottomTabScreenProps<
  BottomTabNavigationParamList,
  'Ranking'
>;

const Stack = createStackNavigator<RankingScreenStackParamList>();

export const RankingScreenStack: React.FC<RankingScreenStackProps> = ({
  navigation,
}) => {
  const theme = useTheme();
  useNotificationHandler(navigation);

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
