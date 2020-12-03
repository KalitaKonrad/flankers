import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Button, Text } from 'react-native';

import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchLocationScreenProps = object &
  StackScreenProps<MatchScreenStackParamList, 'MatchLocation'>;

export const MatchLocationScreen: React.FC<MatchLocationScreenProps> = ({
  navigation,
}) => {
  return (
    <>
      <Text>Match Location Screen</Text>
      <Button
        title="Location"
        onPress={() => navigation.push('MatchInLobby')}
      />
    </>
  );
};
