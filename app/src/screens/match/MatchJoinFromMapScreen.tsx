import { StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { LatLng } from 'react-native-maps';

import { MapViewComponent } from '../../components/map/MapView';
import { useMatchListQuery } from '../../hooks/useMatchListQuery';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchJoinFromMapScreenProps = object &
  StackScreenProps<MatchScreenStackParamList, 'MatchJoinFromMap'>;

const heatPoints = [
  { latitude: 50.06865225060835, longitude: 19.906365908682346, weight: 80 },
];

export const MatchJoinFromMapScreen: React.FC<MatchJoinFromMapScreenProps> = ({
  navigation,
}) => {
  const matchList = useMatchListQuery();

  const [coordinatesArray, setCoordinatesArray] = useState<LatLng[]>();

  useEffect(() => {
    if (matchList.data !== undefined) {
      setCoordinatesArray(
        matchList.data.map((match) => ({
          latitude: parseFloat(match.lat),
          longitude: parseFloat(match.long),
        }))
      );
    }
  }, [matchList.data]);

  return (
    <>
      <MapViewComponent
        heatPoints={heatPoints} // w przyszlosci przesylac tablice coordinatow meczow dostarczona z backendu
        markers={coordinatesArray}
        // w przyszlosci przesylac tablice coordinatow meczow dostarczona z backendu
      />
    </>
  );
};
