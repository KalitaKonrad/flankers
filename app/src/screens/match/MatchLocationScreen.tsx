import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React from 'react';
import { Button, Text } from 'react-native';

import { MapSelectLocation } from '../../components/map/MapSelectLocation';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchLocationScreenProps = object &
  StackScreenProps<MatchScreenStackParamList, 'MatchLocation'>;

export const MatchLocationScreen: React.FC<MatchLocationScreenProps> = ({
  navigation,
}) => {
  return (
    <>
      <Button
        title="Location"
        onPress={() => navigation.push('MatchInLobby')}
      />
      <MapSelectLocation />
    </>
  );
};
