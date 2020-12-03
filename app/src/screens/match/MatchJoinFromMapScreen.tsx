import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Text } from 'react-native';

import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchJoinFromMapScreenProps = object &
  StackScreenProps<MatchScreenStackParamList, 'MatchJoinFromMap'>;

export const MatchJoinFromMapScreen: React.FC<MatchJoinFromMapScreenProps> = ({
  navigation,
}) => {
  return (
    <>
      <Text>Match Join From Map Screen</Text>
    </>
  );
};
