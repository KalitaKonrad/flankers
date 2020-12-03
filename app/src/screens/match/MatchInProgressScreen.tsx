import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';

import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchInProgressScreenProps = object &
  StackScreenProps<MatchScreenStackParamList, 'MatchInProgress'>;

export const MatchInProgressScreen: React.FC<MatchInProgressScreenProps> = ({
  navigation,
}) => {
  return (
    <>
      <Text>Match In Progress Screen</Text>
    </>
  );
};
