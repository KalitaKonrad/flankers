import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { LatLng } from 'react-native-maps';

import { MapSelectLocation } from '../../components/map/MapSelectLocation';
import { SubmitButton } from '../../components/shared/SubmitButton';
import { useMatchCreateMutation } from '../../hooks/useMatchCreateMutation';
import { theme } from '../../theme';
import { MatchScreenStackParamList } from './MatchScreenStack';

interface Coordinates {
  latitude: number;
  longitude: number;
}

type MatchLocationScreenProps = object &
  StackScreenProps<MatchScreenStackParamList, 'MatchLocation'> &
  Coordinates;

export const MatchLocationScreen: React.FC<MatchLocationScreenProps> = ({
  navigation,
  route,
}) => {
  const [markerCoordinates, setMarkerCoordinates] = useState<LatLng>({
    latitude: 0,
    longitude: 0,
  });

  const { isTypeTeam, isRated, isPublic, bet, playersAmount } = route.params;
  const [mutate, mutation] = useMatchCreateMutation();

  const onPress = () => {
    mutate({
      isTypeTeam,
      isRated,
      isPublic,
      bet,
      playersAmount,
      lat: markerCoordinates.latitude,
      long: markerCoordinates.longitude,
    });
    navigation.push('MatchInLobby');
  };

  return (
    <>
      <MapSelectLocation
        onMarkerPlaced={(response) => setMarkerCoordinates(response)}
      />
      <View style={styles.button}>
        <SubmitButton
          backgroundColor={theme.colors.primary}
          labelColor={theme.colors.white}
          onPress={() => {
            console.log(
              `przeslij coordinaty meczu ${markerCoordinates.longitude} | ${markerCoordinates.latitude}`
            );
            navigation.push('MatchInLobby');
          }}>
          Potwierdź lokalizacje
        </SubmitButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    bottom: 15,
  },
});
