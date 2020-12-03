import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Button, Text } from 'react-native';

import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchInLobbyScreenProps = object &
  StackScreenProps<MatchScreenStackParamList, 'MatchInLobby'>;

export const MatchInLobbyScreen: React.FC<MatchInLobbyScreenProps> = ({
  navigation,
}) => {
  return (
    <>
      <Text>Match In Lobby Screen</Text>
      <Button
        title="Rozpoczęcie meczu"
        onPress={() => navigation.push('MatchInProgress')}
      />
    </>
  );
};
