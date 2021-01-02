import { MaterialBottomTabScreenProps } from '@react-navigation/material-bottom-tabs';
import React from 'react';
import { Text } from 'react-native';

import { BottomTabNavigationParamList } from '../../components/BottomTabNavigation';

type RankingScreenProps = MaterialBottomTabScreenProps<
  BottomTabNavigationParamList,
  'Ranking'
>;

export const RankingScreen: React.FC<RankingScreenProps> = ({ navigation }) => {
  return (
    <>
      <Text>Ranking Page</Text>
    </>
  );
};
