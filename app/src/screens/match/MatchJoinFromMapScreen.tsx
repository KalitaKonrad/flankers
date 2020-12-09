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
      <TouchableOpacity onPress={findCoordinates}>
        <Text>Find my cords</Text>
        <Text>Location: {location}</Text>
      </TouchableOpacity>
      <MapViewComponent arr={[{ latitude, longitude, weight: 1 }]} />
    </>
  );
};
