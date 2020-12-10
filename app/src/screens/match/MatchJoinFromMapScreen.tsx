import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

import { MapViewComponent } from '../../components/map/MapView';
import { MatchScreenStackParamList } from './MatchScreenStack';

type MatchJoinFromMapScreenProps = object &
  StackScreenProps<MatchScreenStackParamList, 'MatchJoinFromMap'>;

export const MatchJoinFromMapScreen: React.FC<MatchJoinFromMapScreenProps> = ({
  navigation,
}) => {
  const [location, setLocation] = useState<any>(null);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);

  const findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location1 = JSON.stringify(position);

        setLocation(location1);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      },
      (error) => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  return (
    <>
      <MapViewComponent
        heatPoints={[{ latitude, longitude, weight: 1 }]}
        markers={[
          { latitude: 19.90641586482525, longitude: 50.06779702450417 },
          { latitude: 19.9059746414423, longitude: 19.9059746414423 },
        ]}
        // w przyszlosci przesylac tablice coordinatow meczow dostarczona z backendu
      />
    </>
  );
};
