import { StackScreenProps } from '@react-navigation/stack';
import React from 'react';

import { MapViewComponent } from '../../components/map/MapView';
import { ScreenContent } from '../../components/shared/ScreenContent';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchJoinFromMapScreenProps = object &
  StackScreenProps<MatchScreenStackParamList, 'MatchJoinFromMap'>;

const heatPoints = [
  { latitude: 50.06865225060835, longitude: 19.906365908682346, weight: 80 },
  {
    latitude: 50.06779702450417,
    longitude: 19.9064158648252,
    weight: 4,
  },
  {
    latitude: 50.06779702450416,
    longitude: 19.9064158648257,
    weight: 40,
  },
  {
    latitude: 50.06779702450418,
    longitude: 19.9064158648232,
    weight: 12,
  },
];

const markerPoints = [
  { latitude: 50.06779702450417, longitude: 19.90641586482525 },
  { latitude: 50.06865225060835, longitude: 19.906365908682346 },
];

export const MatchJoinFromMapScreen: React.FC<MatchJoinFromMapScreenProps> = ({
  navigation,
}) => {
  return (
    <ScreenContent>
      <MapViewComponent
        heatPoints={heatPoints} // w przyszlosci przesylac tablice coordinatow meczow dostarczona z backendu
        markers={markerPoints}
        // w przyszlosci przesylac tablice coordinatow meczow dostarczona z backendu
      />
    </ScreenContent>
  );
};
