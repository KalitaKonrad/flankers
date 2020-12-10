import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { LatLng } from 'react-native-maps';

import { MapViewComponent } from '../../components/map/MapView';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchJoinFromMapScreenProps = object &
  StackScreenProps<MatchScreenStackParamList, 'MatchJoinFromMap'>;

export const MatchJoinFromMapScreen: React.FC<MatchJoinFromMapScreenProps> = ({
  navigation,
}) => {
  const [userCoordinate, setUserCoordinate] = useState<LatLng>();

  useEffect(() => {
    findPositionOfUser();
  });

  const findPositionOfUser = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoordinate(position.coords);
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  return (
    <>
      {userCoordinate?.latitude && userCoordinate?.longitude && (
        <MapViewComponent
          heatPoints={[
            {
              latitude: userCoordinate.latitude,
              longitude: userCoordinate.longitude,
              weight: 1,
            },
            {
              latitude: 50.06865225060835,
              longitude: 19.906365908682346,
              weight: 80,
            },
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
          ]} // w przyszlosci przesylac tablice coordinatow meczow dostarczona z backendu
          markers={[
            { latitude: 50.06779702450417, longitude: 19.90641586482525 },
            { latitude: 50.06865225060835, longitude: 19.906365908682346 },
          ]}
          // w przyszlosci przesylac tablice coordinatow meczow dostarczona z backendu
        />
      )}
    </>
  );
};
